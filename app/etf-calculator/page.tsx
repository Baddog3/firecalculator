import type { Metadata } from "next";
import EtfCalculator from "@/components/EtfCalculator";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Калькулятор ETF — доходность с учётом комиссии TER",
  description:
    "Рассчитайте рост портфеля ETF с ежемесячными пополнениями. Сравните результат с комиссией фонда и без неё.",
  alternates: {
    canonical: "/etf-calculator"
  },
  openGraph: {
    title: "Калькулятор ETF — доходность с учётом комиссии TER",
    description:
      "Рассчитайте рост портфеля ETF с ежемесячными пополнениями. Сравните результат с комиссией фонда и без неё.",
    url: `${siteUrl}/etf-calculator`
  }
};

export default function EtfCalculatorPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Калькулятор ETF</h1>
      <EtfCalculator />
    </div>
  );
}
