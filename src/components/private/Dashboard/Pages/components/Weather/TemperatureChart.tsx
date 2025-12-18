import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useWeatherStore } from "../../../../../../stores";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TemperatureChartProps {
  data: Array<{
    time: string;
    temp: number;
  }>;
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const { temperatureUnit } = useWeatherStore();

  const maxTemp = Math.max(...data.map((d) => d.temp));
  const minTemp = Math.min(...data.map((d) => d.temp));

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">
          Temperatures today
        </h3>

        <p className="flex items-center gap-2 text-sm font-display text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <ChevronUp className="h-4 w-4" />
            {maxTemp}°
          </span>
          ‧
          <span className="flex items-center gap-1">
            <ChevronDown className="h-4 w-4" />
            {minTemp}°
          </span>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="0"
            stroke="#e5e7eb"
            strokeOpacity={0.5}
            className="dark:stroke-zinc-700"
          />
          <XAxis
            dataKey="time"
            tick={{ fill: "#71717a", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "#71717a", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={["dataMin - 2", "dataMax + 2"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b90",
              border: "1px solid #27272a",
              borderRadius: "12px",
              color: "#fff",
              fontFamily: "tx-02",
              fontWeight: "bold",
            }}
            formatter={(value: number) => [
              `${value}°${temperatureUnit}`,
              "Temp",
            ]}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#colorTemp)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
