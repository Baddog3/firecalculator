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
import { brand } from "@/lib/brand";

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

const { primary, secondary, grid, muted } = brand.chart;

export default function CompoundChart({
  data,
  primaryName = "С пополнениями",
  secondaryName = "Без пополнений"
}: CompoundChartProps) {
  return (
    <div className="card-fintech h-72 w-full overflow-hidden p-card sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke={grid} strokeDasharray="2 2" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fill: muted }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={rubFormat}
            tick={{ fontSize: 12, fill: muted }}
            width={90}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => rubFormat(value)}
            contentStyle={{
              borderRadius: "12px",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0 0 #d4ff00",
              fontSize: "13px",
              fontWeight: 600
            }}
          />
          <Line
            type="monotone"
            dataKey="withContributions"
            stroke={primary}
            strokeWidth={2.5}
            dot={false}
            name={primaryName}
          />
          <Line
            type="monotone"
            dataKey="withoutContributions"
            stroke={secondary}
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            name={secondaryName}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
