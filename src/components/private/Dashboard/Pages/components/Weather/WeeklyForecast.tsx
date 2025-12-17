import { Cloud, CloudRain, CloudSnow, Sun } from "lucide-react";
import { useWeatherStore } from "../../../../../../stores";

interface WeeklyForecastProps {
  dailyData: Array<{
    date: string;
    day: {
      maxtemp_c: number;
      maxtemp_f: number;
      mintemp_c: number;
      mintemp_f: number;
      condition: {
        text: string;
        icon: string;
      };
      daily_chance_of_rain: number;
      daily_chance_of_snow: number;
    };
  }>;
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ dailyData }) => {
  const { temperatureUnit } = useWeatherStore();
  const isCelsius = temperatureUnit === "C";

  const getWeatherIcon = (conditionText: string) => {
    const text = conditionText.toLowerCase();
    if (text.includes("rain")) return CloudRain;
    if (text.includes("snow")) return CloudSnow;
    if (text.includes("cloud") || text.includes("overcast")) return Cloud;
    return Sun;
  };

  const formatDay = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only
    date.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.getTime() === today.getTime()) {
      return "Today";
    } else if (date.getTime() === tomorrow.getTime()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }
  };

  const getTempRange = (day: WeeklyForecastProps["dailyData"][0]["day"]) => {
    const max = isCelsius ? day.maxtemp_c : day.maxtemp_f;
    const min = isCelsius ? day.mintemp_c : day.mintemp_f;
    return { max: Math.round(max), min: Math.round(min) };
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        Forecast
      </h3>

      <div className="space-y-3">
        {dailyData.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.day.condition.text);
          const { max, min } = getTempRange(day.day);
          const dayLabel = formatDay(day.date);

          return (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
            >
              {/* Day */}
              <div className="flex items-center gap-3 flex-1">
                <WeatherIcon
                  size={20}
                  className="text-zinc-600 dark:text-zinc-400"
                />
                <span className="font-display text-sm text-zinc-900 dark:text-zinc-100">
                  {dayLabel}
                </span>
              </div>

              {/* Temperature range with bar */}
              <div className="flex items-center gap-4 flex-1 justify-end">
                <span className="text-sm font-display text-zinc-500 dark:text-zinc-400 w-8 text-right">
                  {min}°
                </span>
                <div className="w-24 h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full"
                    style={{
                      width: `${((max - min) / max) * 100}%`,
                      marginLeft: `${(min / max) * 50}%`,
                    }}
                  />
                </div>
                <span className="text-sm font-display font-semibold text-zinc-900 dark:text-zinc-100 w-8">
                  {max}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyForecast;
