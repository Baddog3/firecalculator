import { Flame, Home, LineChart, Shield, TrendingUp, type LucideIcon } from "lucide-react";

export const calculatorIcons = {
  "compound-interest": TrendingUp,
  "fire-calculator": Flame,
  "etf-calculator": LineChart,
  "rent-vs-buy": Home,
  "emergency-fund": Shield
} as const satisfies Record<string, LucideIcon>;

export type CalculatorIconKey = keyof typeof calculatorIcons;
