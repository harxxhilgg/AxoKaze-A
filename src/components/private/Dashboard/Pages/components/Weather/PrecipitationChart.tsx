import { ChevronDown, ChevronUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PrecipitationChartProps {
  data: Array<{
    time: string;
    precipitation: number;
  }>;
}

const PrecipitationChart: React.FC<PrecipitationChartProps> = ({ data }) => {
  const maxPrecip = Math.max(...data.map((d) => d.precipitation));
  const minPrecip = Math.min(...data.map((d) => d.precipitation));

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800">
      <div className="mb-4">
        <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">
          Precipitation today
        </h3>

        <p className="flex items-center gap-2 text-sm font-display text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <ChevronUp className="h-4 w-4" />
            {maxPrecip}%
          </span>
          ‧
          <span className="flex items-center gap-1">
            <ChevronDown className="h-4 w-4" />
            {minPrecip}%
          </span>
        </p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
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
            domain={[0, "dataMax + 10"]}
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
            formatter={(value: number) => [`${value}%`, "Chance"]}
          />
          <Line
            type="monotone"
            dataKey="precipitation"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PrecipitationChart;
