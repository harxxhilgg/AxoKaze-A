import type React from "react";
import type { CurrentWeather as CurrentWeatherType } from "../../../../../../types";
import { useWeatherStore } from "../../../../../../stores";
import { Droplets, Eye, Gauge, Sun, Sunrise, Sunset, Wind } from "lucide-react";

interface CurrentWeatherProps {
  weather: CurrentWeatherType;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather }) => {
  const { temperatureUnit } = useWeatherStore();
  const isCelsius = temperatureUnit === "C";

  const temp = isCelsius ? weather.current.temp_c : weather.current.temp_f;
  const feelsLike = isCelsius
    ? weather.current.feelslike_c
    : weather.current.feelslike_f;
  const windSpeed = isCelsius
    ? weather.current.wind_kph
    : weather.current.wind_mph;
  const visibility = isCelsius
    ? weather.current.vis_km
    : weather.current.vis_miles;

  const weatherDetails = [
    {
      label: "Feels Like",
      value: `${Math.round(feelsLike)}°${temperatureUnit}`,
      icon: Droplets,
    },
    {
      label: "Humidity",
      value: `${weather.current.humidity}%`,
      icon: Droplets,
    },
    {
      label: "Wind",
      value: `${windSpeed} ${isCelsius ? "km/h" : "mph"} ${weather.current.wind_dir}`,
      icon: Wind,
    },
    {
      label: "Pressure",
      value: `${weather.current.pressure_mb} mb`,
      icon: Gauge,
    },
    {
      label: "Visibility",
      value: `${visibility} ${isCelsius ? "km" : "mi"}`,
      icon: Eye,
    },
    {
      label: "UV Index",
      value: weather.current.uv.toString(),
      icon: Sun,
    },
    {
      label: "Sunrise",
      value: weather.astronomy.sunrise,
      icon: Sunrise,
    },
    {
      label: "Sunset",
      value: weather.astronomy.sunset,
      icon: Sunset,
    },
  ];

  return (
    <div className="space-y-6">
      {/* main weather display */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            className="w-24 h-24"
          />
          <div>
            <h2 className="text-6xl font-display font-bold text-zinc-900 dark:text-zinc-100">
              {Math.round(temp)}°{temperatureUnit}
            </h2>
            <p className="text-xl font-display text-zinc-600 dark:text-zinc-400 mt-1">
              {weather.current.condition.text}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">
            {weather.location.name}
          </p>
          <p className="text-sm font-display text-zinc-500 dark:text-zinc-400">
            {weather.location.region && `${weather.location.region}, `}
            {weather.location.country}
          </p>
          <p className="text-xs font-display text-zinc-400 dark:text-zinc-500 mt-1">
            Last updated:{" "}
            {new Date(weather.current.last_updated).toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-4 gap-4">
        {weatherDetails.map((detail) => {
          const Icon = detail.icon;
          return (
            <div
              key={detail.label}
              className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={16} className="text-zinc-500 dark:text-zinc-400" />
                <span className="text-xs font-display text-zinc-500 dark:text-zinc-400">
                  {detail.label}
                </span>
              </div>
              <p className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">
                {detail.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentWeather;
