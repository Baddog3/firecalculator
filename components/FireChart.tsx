"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { brand } from "@/lib/brand";
import { chartTooltipStyle } from "@/lib/chart-styles";

type FireChartPoint = {
  age: number;
  portfolioRecommended: number;
  portfolioCurrent: number;
};

type FireChartProps = {
  data: FireChartPoint[];
  fireTarget: number;
  intersectionAge: number | null;
  intersectionAgeCurrent: number | null;
};

const rubFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const { primary, secondary, grid, muted } = brand.chart;

export default function FireChart({
  data,
  fireTarget,
  intersectionAge,
  intersectionAgeCurrent
}: FireChartProps) {
  const intersectionRecommended = intersectionAge
    ? data.find((point) => point.age === intersectionAge)
    : null;
  const intersectionCurrent = intersectionAgeCurrent
    ? data.find((point) => point.age === intersectionAgeCurrent)
    : null;

  return (
    <div className="card h-72 w-full overflow-hidden p-card sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={primary} stopOpacity={0.12} />
              <stop offset="100%" stopColor={primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} strokeDasharray="2 2" vertical={false} />
          <XAxis dataKey="age" tick={{ fontSize: 12, fill: muted }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={rubFormat}
            tick={{ fontSize: 12, fill: muted }}
            width={90}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name: string) => [rubFormat(value), name]}
            labelFormatter={(age) => `Возраст: ${age}`}
            contentStyle={chartTooltipStyle}
          />
          <ReferenceLine
            y={fireTarget}
            stroke={secondary}
            strokeDasharray="6 4"
            label={{
              value: "FIRE-цель",
              position: "insideTopRight",
              fill: muted,
              fontSize: 12
            }}
          />
          <Area
            type="monotone"
            dataKey="portfolioRecommended"
            stroke={primary}
            strokeWidth={2}
            fill="url(#fireGradient)"
            name="Рекомендуемый взнос"
          />
          <Line
            type="monotone"
            dataKey="portfolioCurrent"
            stroke={secondary}
            strokeWidth={2}
            strokeDasharray="6 4"
            dot={false}
            name="Текущий взнос"
          />
          {intersectionRecommended ? (
            <ReferenceDot
              x={intersectionRecommended.age}
              y={intersectionRecommended.portfolioRecommended}
              r={5}
              fill={primary}
              stroke={primary}
              strokeWidth={2}
            />
          ) : null}
          {intersectionCurrent &&
          intersectionCurrent.age !== intersectionRecommended?.age ? (
            <ReferenceDot
              x={intersectionCurrent.age}
              y={intersectionCurrent.portfolioCurrent}
              r={5}
              fill={secondary}
              stroke={secondary}
              strokeWidth={2}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
