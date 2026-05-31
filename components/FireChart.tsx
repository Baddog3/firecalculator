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

const ACCENT = "#dc2626";
const GRID = "#e7e5e4";
const MUTED = "#737373";

export default function FireChart({ data, fireTarget, intersectionAge }: FireChartProps) {
  const intersectionPoint = intersectionAge
    ? data.find((point) => point.age === intersectionAge)
    : null;

  return (
    <div className="card-fintech h-72 w-full overflow-hidden p-4 sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.15} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} strokeDasharray="2 2" vertical={false} />
          <XAxis dataKey="age" tick={{ fontSize: 12, fill: MUTED }} axisLine={false} tickLine={false} />
          <YAxis
            tickFormatter={rubFormat}
            tick={{ fontSize: 12, fill: MUTED }}
            width={90}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => rubFormat(value)}
            labelFormatter={(age) => `Возраст: ${age}`}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e7e5e4",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              fontSize: "13px"
            }}
          />
          <ReferenceLine
            y={fireTarget}
            stroke={MUTED}
            strokeDasharray="6 4"
            label={{
              value: "FIRE-цель",
              position: "insideTopRight",
              fill: MUTED,
              fontSize: 12
            }}
          />
          <Area
            type="monotone"
            dataKey="portfolio"
            stroke={ACCENT}
            strokeWidth={2}
            fill="url(#fireGradient)"
            name="Портфель"
          />
          {intersectionPoint ? (
            <ReferenceDot
              x={intersectionPoint.age}
              y={intersectionPoint.portfolio}
              r={6}
              fill={ACCENT}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
