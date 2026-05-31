import type { Metadata } from "next";
import CalculatorCard from "@/components/CalculatorCard";
import PageHeader from "@/components/PageHeader";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Финансовые калькуляторы для инвесторов — бесплатно",
  description:
    "Калькуляторы сложного процента, FIRE, доходности ETF и других показателей. Бесплатно, без регистрации.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Финансовые калькуляторы для инвесторов — бесплатно",
    description:
      "Калькуляторы сложного процента, FIRE, доходности ETF и других показателей. Бесплатно, без регистрации.",
    url: `${siteUrl}/`
  }
};

const calculators = [
  {
    title: "Калькулятор сложного процента",
    description: "Рассчитайте рост капитала с учётом регулярных пополнений.",
    href: "/compound-interest"
  },
  {
    title: "FIRE-калькулятор",
    description: "Определите цель капитала для финансовой независимости.",
    href: "/fire-calculator"
  },
  {
    title: "Калькулятор ETF",
    description: "Оценка доходности ETF с учётом комиссии TER.",
    href: "/etf-calculator"
  },
  {
    title: "Аренда vs ипотека",
    description: "Сравнение сценариев владения и аренды жилья.",
    href: "/rent-vs-buy"
  }
];

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="Финансовые калькуляторы"
        description="Простые инструменты для инвесторов. Считайте доходность, FIRE-число и многое другое."
      />

      <section>
        <h2 className="mb-3 text-base font-semibold">Калькуляторы</h2>
        <ul className="grid gap-3">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </ul>
      </section>
    </div>
  );
}
