export type TemperatureUnit = "C" | "F";
export type TimelineView = "hourly" | "daily";

export type Location = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type CurrentWeather = {
  location: Location;
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_kph: number;
    wind_mph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    humidity: number;
    cloud: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    last_updated: string;
  };
  astronomy: {
    sunrise: string;
    sunset: string;
  };
};

export type HourlyForecast = {
  time: string;
  time_epoch: number;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  chance_of_rain: number;
  chance_of_snow: number;
};

export type DailyForecast = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    maxwind_kph: number;
    maxwind_mph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    daily_chance_of_snow: number;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
};

export type ForecastData = {
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  cachedAt: number; // timestamp
};

export type WeatherStore = {
  searchTerm: string;
  selectedLocation: Location | null;
  currentWeather: CurrentWeather | null;
  forecast: ForecastData | null;
  cachedLocationId: number | null; // track which location the forecast belongs to
  savedLocations: Location[];
  temperatureUnit: TemperatureUnit;
  timelineView: TimelineView;
  isLoadingSearch: boolean;
  isLoadingWeather: boolean;
  isLoadingForecast: boolean;
  error: string | null;

  setSearchTerm: (term: string) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setTimelineView: (view: TimelineView) => void;
  searchLocations: (query: string) => Promise<Location[]>;
  fetchWeather: (location: Location) => Promise<void>;
  fetchForecast: (location: Location, forceRefresh?: boolean) => Promise<void>;
  clearWeather: () => void;
  addSavedLocation: (location: Location) => void;
  removeSavedLocation: (locationId: number) => void;
  resetWeatherStore: () => void;
};
