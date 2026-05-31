"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type CompoundChartPoint = {
  year: number;
  withContributions: number;
  withoutContributions: number;
};

type CompoundChartProps = {
  data: CompoundChartPoint[];
  primaryName?: string;
  secondaryName?: string;
};

const rubFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const ACCENT = "#dc2626";
const MUTED = "#737373";
const GRID = "#e7e5e4";
const SECONDARY = "#a8a29e";

export default function CompoundChart({
  data,
  primaryName = "С пополнениями",
  secondaryName = "Без пополнений"
}: CompoundChartProps) {
  return (
    <div className="card-fintech h-72 w-full overflow-hidden p-4 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={GRID} strokeDasharray="2 2" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: MUTED }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={rubFormat}
            tick={{ fontSize: 12, fill: MUTED }}
            width={90}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => rubFormat(value)}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              fontSize: "13px"
            }}
          />
          <Line
            type="monotone"
            dataKey="withContributions"
            stroke={ACCENT}
            strokeWidth={2}
            dot={false}
            name={primaryName}
          />
          <Line
            type="monotone"
            dataKey="withoutContributions"
            stroke={SECONDARY}
            strokeWidth={2}
            dot={false}
            name={secondaryName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
