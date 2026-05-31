import type { Metadata } from "next";
import EtfCalculator from "@/components/EtfCalculator";
import PageHeader from "@/components/PageHeader";
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
      <PageHeader
        title="Калькулятор ETF"
        description="Оцените рост портфеля ETF с учётом комиссии TER и ежемесячных пополнений."
      />
      <EtfCalculator />
    </div>
  );
}
