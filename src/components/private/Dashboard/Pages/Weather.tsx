import { useCallback, useEffect, useRef, useState } from "react";
import { X, Search, MapPin } from "lucide-react";
import { useWeatherStore } from "../../../../stores";
import LocationSearchDropdown from "./components/Weather/LocationSearchDropdown";
import CurrentWeather from "./components/Weather/CurrentWeather";
import WeatherSkeleton from "./components/Weather/WeatherSkeleton";
import ForecastSkeleton from "./components/Weather/ForecastSkeleton";
import WeatherCalendar from "./components/Weather/WeatherCalendar";
import TemperatureChart from "./components/Weather/TemperatureChart";
import PrecipitationChart from "./components/Weather/PrecipitationChart";
import WeeklyForecast from "./components/Weather/WeeklyForecast";
import type { Location } from "../../../../types";

const Weather = () => {
  const {
    searchTerm,
    selectedLocation,
    currentWeather,
    forecast,
    temperatureUnit,
    isLoadingSearch,
    isLoadingWeather,
    isLoadingForecast,
    setSearchTerm,
    searchLocations,
    fetchWeather,
    clearWeather,
  } = useWeatherStore();

  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [locationPermissionDenied, setLocationPermissionDenied] =
    useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null!);
  const dropdownItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // request user location on first load
  useEffect(() => {
    if (navigator.geolocation && !selectedLocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // search for location by coordinates
          const locations = await searchLocations(`${latitude},${longitude}`);
          if (locations.length > 0) {
            fetchWeather(locations[0]);
          }
        },
        (error) => {
          console.log("Location permission denied:", error);
          setLocationPermissionDenied(true);
        }
      );
    }
  }, [selectedLocation, searchLocations, fetchWeather]);

  const handleSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setFilteredLocations([]);
        setShowDropdown(false);
        return;
      }

      const locations = await searchLocations(term);
      setFilteredLocations(locations);
      setShowDropdown(locations.length > 0 || isLoadingSearch);
      setHighlightedIndex(-1);
    },
    [searchLocations, isLoadingSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const scrollToHighlightedItem = (index: number) => {
    if (index >= 0 && dropdownItemRefs.current[index]) {
      dropdownItemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        if (!showDropdown || filteredLocations.length === 0) return;
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex =
            prev < filteredLocations.length - 1 ? prev + 1 : prev;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;

      case "ArrowUp":
        if (!showDropdown || filteredLocations.length === 0) return;
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : -1;
          scrollToHighlightedItem(newIndex);
          return newIndex;
        });
        break;

      case "Enter":
        if (!showDropdown || filteredLocations.length === 0) return;
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredLocations.length
        ) {
          selectLocation(filteredLocations[highlightedIndex]);
        }
        break;

      case "Escape":
        e.preventDefault();
        setShowDropdown(false);
        setHighlightedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const dropdown = dropdownRef.current;

    if (dropdown && dropdown.contains(relatedTarget)) {
      return;
    }

    setTimeout(() => {
      setShowDropdown(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  const setItemRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      dropdownItemRefs.current[index] = el;
    },
    []
  );

  const selectLocation = (location: Location) => {
    setSearchTerm(`${location.name}, ${location.country}`);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    fetchWeather(location);
  };

  const handleClearSearch = () => {
    clearWeather();
    setShowDropdown(false);
    setHighlightedIndex(-1);
    setFilteredLocations([]);
  };

  // prepare chart data from hourly forecast
  const getChartData = () => {
    if (!forecast || !forecast.hourly) return { temp: [], precip: [] };

    const isCelsius = temperatureUnit === "C";
    const tempData = forecast.hourly.slice(0, 24).map((hour) => ({
      time: new Date(hour.time).getHours().toString().padStart(2, "0"),
      temp: Math.round(isCelsius ? hour.temp_c : hour.temp_f),
    }));

    const precipData = forecast.hourly.slice(0, 24).map((hour) => ({
      time: new Date(hour.time).getHours().toString().padStart(2, "0"),
      precipitation: hour.chance_of_rain,
    }));

    return { temp: tempData, precip: precipData };
  };

  const { temp: tempChartData, precip: precipChartData } = getChartData();

  return (
    <div className="bg-white dark:bg-zinc-900 p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {/* search section */}
      <div className="relative mb-8">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              onBlur={handleInputBlur}
              onFocus={() => {
                if (searchTerm && filteredLocations.length > 0) {
                  setShowDropdown(true);
                }
              }}
              placeholder="Search for a city or location..."
              className="w-full px-4 py-3 pl-12 rounded-lg font-display bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-zinc-400" />
            </div>

            {selectedLocation && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg cursor-pointer transition-colors active:scale-95 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-700"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* calendar widget - only show when weather is loaded */}
          {currentWeather && <WeatherCalendar />}
        </div>

        <LocationSearchDropdown
          showDropdown={showDropdown}
          locations={filteredLocations}
          highlightedIndex={highlightedIndex}
          searchTerm={searchTerm}
          dropdownRef={dropdownRef}
          setItemRef={setItemRef}
          selectLocation={selectLocation}
          isLoading={isLoadingSearch}
        />
      </div>

      {/* weather content */}
      {isLoadingWeather ? (
        <WeatherSkeleton />
      ) : currentWeather ? (
        <div className="space-y-6">
          {/* current weather */}
          <CurrentWeather weather={currentWeather} />

          {/* forecast grid - weekly + charts */}
          {isLoadingForecast ? (
            <ForecastSkeleton />
          ) : forecast ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Weekly Forecast - takes 1 column */}
              <div className="lg:col-span-1">
                <WeeklyForecast dailyData={forecast.daily} />
              </div>

              {/* Charts - takes 2 columns */}
              <div className="lg:col-span-2 space-y-6">
                <TemperatureChart data={tempChartData} />
                <PrecipitationChart data={precipChartData} />
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">
            {locationPermissionDenied ? "🌍" : "⛅"}
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            {locationPermissionDenied
              ? "Search for a Location"
              : "Checking Your Location..."}
          </h3>
          <p className="font-display font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            {locationPermissionDenied
              ? "Search for any city to see current weather and forecast"
              : "We'll show weather for your current location"}
          </p>
          <p className="font-display text-sm text-zinc-500 dark:text-zinc-500 flex items-center justify-center gap-2">
            <MapPin size={14} />
            Try "New York", "London", or "Tokyo"
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
