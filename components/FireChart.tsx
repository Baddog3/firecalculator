"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { brand } from "@/lib/brand";

type FireChartPoint = {
  age: number;
  portfolio: number;
};

type FireChartProps = {
  data: FireChartPoint[];
  fireTarget: number;
  intersectionAge: number | null;
};

const rubFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

const { primary, accent, grid, muted } = brand.chart;

export default function FireChart({ data, fireTarget, intersectionAge }: FireChartProps) {
  const intersectionPoint = intersectionAge
    ? data.find((point) => point.age === intersectionAge)
    : null;

  return (
    <div className="card-fintech h-72 w-full overflow-hidden p-card sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.4} />
              <stop offset="100%" stopColor={accent} stopOpacity={0.05} />
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
            formatter={(value: number) => rubFormat(value)}
            labelFormatter={(age) => `Возраст: ${age}`}
            contentStyle={{
              borderRadius: "12px",
              border: "2px solid #000000",
              boxShadow: "3px 3px 0 0 #d4ff00",
              fontSize: "13px",
              fontWeight: 600
            }}
          />
          <ReferenceLine
            y={fireTarget}
            stroke={muted}
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
            dataKey="portfolio"
            stroke={primary}
            strokeWidth={2.5}
            fill="url(#fireGradient)"
            name="Портфель"
          />
          {intersectionPoint ? (
            <ReferenceDot
              x={intersectionPoint.age}
              y={intersectionPoint.portfolio}
              r={7}
              fill={accent}
              stroke={primary}
              strokeWidth={2}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
