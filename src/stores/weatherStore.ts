import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  WeatherStore,
  Location,
  CurrentWeather,
  ForecastData,
  TemperatureUnit,
  TimelineView,
  HourlyForecast,
  DailyForecast,
} from "../types/weather";

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const BASE_URL = "https://api.weatherapi.com/v1";
const CACHE_DURATION = 30 * 60 * 1000; // 30 mins

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set, get) => ({
      searchTerm: "",
      selectedLocation: null,
      currentWeather: null,
      forecast: null,
      cachedLocationId: null, // track which location the forecast belongs to
      savedLocations: [],
      temperatureUnit: "C",
      timelineView: "hourly",
      isLoadingSearch: false,
      isLoadingWeather: false,
      isLoadingForecast: false,
      error: null,

      setSearchTerm: (term: string) => set({ searchTerm: term }),

      setTemperatureUnit: (unit: TemperatureUnit) => {
        set({ temperatureUnit: unit });
      },

      setTimelineView: (view: TimelineView) => set({ timelineView: view }),

      searchLocations: async (query: string) => {
        if (!query.trim()) return [];

        try {
          set({ isLoadingSearch: true, error: null });

          const res = await fetch(
            `${BASE_URL}/search.json?key=${API_KEY}&q=${encodeURIComponent(query)}`
          );

          if (!res.ok) {
            throw new Error("Failed to search locations");
          }

          const data = await res.json();
          set({ isLoadingSearch: false });

          return data as Location[];
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingSearch: false,
          });
          return [];
        }
      },

      fetchWeather: async (location: Location) => {
        try {
          set({ isLoadingWeather: true, error: null });

          const res = await fetch(
            `${BASE_URL}/current.json?key=${API_KEY}&q=${location.lat},${location.lon}&aqi=no`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch weather");
          }

          const data = await res.json();

          // fetch astronomy data separately
          const astroRes = await fetch(
            `${BASE_URL}/astronomy.json?key=${API_KEY}&q=${location.lat},${location.lon}&dt=${new Date().toISOString().split("T")[0]}`
          );

          const astroData = astroRes.ok ? await astroRes.json() : null;

          const currentWeather: CurrentWeather = {
            location: data.location,
            current: data.current,
            astronomy: astroData?.astronomy?.astro || {
              sunrise: "N/A",
              sunset: "N/A",
            },
          };

          set({
            selectedLocation: location,
            currentWeather,
            isLoadingWeather: false,
          });

          // auto-fetch forecast
          get().fetchForecast(location);
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingWeather: false,
          });
        }
      },

      fetchForecast: async (location: Location, forceRefresh = false) => {
        const state = get();

        // check cache (30min) AND location match
        if (
          !forceRefresh &&
          state.forecast &&
          state.cachedLocationId === location.id &&
          Date.now() - state.forecast.cachedAt < CACHE_DURATION
        ) {
          return;
        }

        try {
          set({ isLoadingForecast: true, error: null });

          const res = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location.lat},${location.lon}&days=7&aqi=no&alerts=no`
          );

          if (!res.ok) {
            throw new Error("Failed to fetch forecast");
          }

          const data = await res.json();

          // extract hourly data (next 48 hours)
          const hourly = data.forecast.forecastday
            .flatMap((day: { hour: HourlyForecast[] }) => day.hour)
            .filter(
              (hour: HourlyForecast) => hour.time_epoch > Date.now() / 1000
            )
            .slice(0, 48);

          // extract daily data
          const daily = data.forecast.forecastday.map(
            (day: {
              date: string;
              date_epoch: number;
              day: DailyForecast["day"];
              astro: DailyForecast["astro"];
            }) => ({
              date: day.date,
              date_epoch: day.date_epoch,
              day: day.day,
              astro: day.astro,
            })
          );

          const forecast: ForecastData = {
            hourly,
            daily,
            cachedAt: Date.now(),
          };

          set({
            forecast,
            cachedLocationId: location.id, // track which location this forecast is for
            isLoadingForecast: false,
          });
        } catch (e) {
          const error = e as Error;
          set({
            error: error.message ?? "Unknown error",
            isLoadingForecast: false,
          });
        }
      },

      clearWeather: () => {
        set({
          searchTerm: "",
          selectedLocation: null,
          currentWeather: null,
          forecast: null,
          cachedLocationId: null,
        });
      },

      addSavedLocation: (location: Location) => {
        const { savedLocations } = get();
        if (!savedLocations.find((loc) => loc.id === location.id)) {
          set({ savedLocations: [...savedLocations, location] });
        }
      },

      removeSavedLocation: (locationId: number) => {
        set({
          savedLocations: get().savedLocations.filter(
            (loc) => loc.id !== locationId
          ),
        });
      },

      resetWeatherStore: () => {
        set({
          searchTerm: "",
          selectedLocation: null,
          currentWeather: null,
          forecast: null,
          cachedLocationId: null,
          savedLocations: [],
          temperatureUnit: "C",
          timelineView: "hourly",
          isLoadingSearch: false,
          isLoadingWeather: false,
          isLoadingForecast: false,
          error: null,
        });
      },
    }),
    {
      name: "weather-storage",
      partialize: (state) => ({
        savedLocations: state.savedLocations,
        temperatureUnit: state.temperatureUnit,
      }),
    }
  )
);
