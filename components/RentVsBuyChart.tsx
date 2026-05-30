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

type RentVsBuyChartPoint = {
  year: number;
  buyerNetWorth: number;
  renterNetWorth: number;
};

type RentVsBuyChartProps = {
  data: RentVsBuyChartPoint[];
};

const rubFormat = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(value);

export default function RentVsBuyChart({ data }: RentVsBuyChartProps) {
  return (
    <div className="h-80 w-full border border-border bg-bg-secondary p-3">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e5e5e5" strokeDasharray="2 2" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={rubFormat} tick={{ fontSize: 12 }} width={90} />
          <Tooltip formatter={(value: number) => rubFormat(value)} labelFormatter={(year) => `Год ${year}`} />
          <Line
            type="monotone"
            dataKey="buyerNetWorth"
            stroke="#111111"
            strokeWidth={2}
            dot={false}
            name="Покупка"
          />
          <Line
            type="monotone"
            dataKey="renterNetWorth"
            stroke="#888888"
            strokeWidth={2}
            dot={false}
            name="Аренда"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
