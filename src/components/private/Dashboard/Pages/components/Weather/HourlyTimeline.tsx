import { Droplet } from "lucide-react";
import { useWeatherStore } from "../../../../../../stores";
import type { HourlyForecast } from "../../../../../../types";

interface HourlyTimelineProps {
  hourlyData: HourlyForecast[];
}

const HourlyTimeline: React.FC<HourlyTimelineProps> = ({ hourlyData }) => {
  const { temperatureUnit } = useWeatherStore();
  const isCelsius = temperatureUnit === "C";

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-100">
        Hourly Forecast
      </h3>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {hourlyData.map((hour, index) => {
            const temp = isCelsius ? hour.temp_c : hour.temp_f;
            const rainChance = Math.max(
              hour.chance_of_rain,
              hour.chance_of_snow
            );

            return (
              <div
                key={index}
                className="shrink-0 w-28 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-shadow"
              >
                {/* time */}
                <p className="text-sm font-display font-semibold text-zinc-900 dark:text-zinc-100 text-center mb-3">
                  {formatTime(hour.time)}
                </p>

                {/* weather Icon */}
                <div className="flex justify-center mb-3">
                  <img
                    src={`https:${hour.condition.icon}`}
                    alt={hour.condition.text}
                    className="w-12 h-12"
                  />
                </div>

                {/* temperature */}
                <p className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-100 text-center mb-2">
                  {Math.round(temp)}°
                </p>

                {/* rain chance */}
                {rainChance > 0 && (
                  <div className="flex items-center justify-center gap-1 text-blue-500 dark:text-blue-400">
                    <Droplet size={12} />
                    <span className="text-xs font-display font-semibold">
                      {rainChance}%
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyTimeline;
