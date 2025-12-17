import { Droplet, Wind } from "lucide-react";
import { useWeatherStore } from "../../../../../../stores";
import type { DailyForecast } from "../../../../../../types";

interface DailyTimelineProps {
  dailyData: DailyForecast[];
}

const DailyTimeline: React.FC<DailyTimelineProps> = ({ dailyData }) => {
  const { temperatureUnit } = useWeatherStore();
  const isCelsius = temperatureUnit === "C";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100">
        7-Day Forecast
      </h3>

      <div className="space-y-3">
        {dailyData.map((day, index) => {
          const maxTemp = isCelsius ? day.day.maxtemp_c : day.day.maxtemp_f;
          const minTemp = isCelsius ? day.day.mintemp_c : day.day.mintemp_f;
          const windSpeed = isCelsius
            ? day.day.maxwind_kph
            : day.day.maxwind_mph;
          const rainChance = Math.max(
            day.day.daily_chance_of_rain,
            day.day.daily_chance_of_snow
          );

          return (
            <div
              key={index}
              className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                {/* date */}
                <div className="flex-1">
                  <p className="font-display font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatDate(day.date)}
                  </p>
                  <p className="text-xs font-display text-zinc-500 dark:text-zinc-400">
                    {day.astro.sunrise} - {day.astro.sunset}
                  </p>
                </div>

                {/* weather icon + condition */}
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={`https:${day.day.condition.icon}`}
                    alt={day.day.condition.text}
                    className="w-12 h-12"
                  />
                  <p className="text-sm font-display text-zinc-600 dark:text-zinc-400">
                    {day.day.condition.text}
                  </p>
                </div>

                {/* temperature range */}
                <div className="flex items-center gap-4 flex-1 justify-end">
                  <div className="flex items-center gap-2">
                    {rainChance > 0 && (
                      <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                        <Droplet size={14} />
                        <span className="text-xs font-display font-semibold">
                          {rainChance}%
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                      <Wind size={14} />
                      <span className="text-xs font-display">
                        {windSpeed} {isCelsius ? "km/h" : "mph"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-display font-bold text-zinc-900 dark:text-zinc-100">
                      {Math.round(maxTemp)}°
                    </span>
                    <span className="text-lg font-display text-zinc-500 dark:text-zinc-400">
                      {Math.round(minTemp)}°
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyTimeline;
