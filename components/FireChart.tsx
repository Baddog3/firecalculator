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

export default function FireChart({ data, fireTarget, intersectionAge }: FireChartProps) {
  const intersectionPoint = intersectionAge
    ? data.find((point) => point.age === intersectionAge)
    : null;

  return (
    <div className="h-80 w-full border border-border bg-bg-secondary p-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="2 2" />
          <XAxis dataKey="age" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={rubFormat} tick={{ fontSize: 12 }} width={90} />
          <Tooltip formatter={(value: number) => rubFormat(value)} labelFormatter={(age) => `Возраст: ${age}`} />
          <ReferenceLine
            y={fireTarget}
            stroke="#888888"
            strokeDasharray="6 4"
            label={{ value: "FIRE-цель", position: "insideTopRight", fill: "#888888", fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="portfolio"
            stroke="#111111"
            fill="#e5e5e5"
            name="Портфель"
          />
          {intersectionPoint ? (
            <ReferenceDot
              x={intersectionPoint.age}
              y={intersectionPoint.portfolio}
              r={5}
              fill="#111111"
              stroke="#ffffff"
              strokeWidth={2}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
