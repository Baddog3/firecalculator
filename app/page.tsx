import type { Metadata } from "next";
import CalculatorCard from "@/components/CalculatorCard";

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
    url: "https://yourdomain.com/"
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
    title: "Калькулятор ETF (скоро)",
    description: "Оценка доходности ETF и ребалансировки.",
    href: "/etf-calculator"
  },
  {
    title: "Аренда vs ипотека (скоро)",
    description: "Сравнение сценариев владения и аренды жилья.",
    href: "/rent-vs-buy"
  }
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Финансовые калькуляторы</h1>
      <p className="mt-3 max-w-2xl text-text-muted">
        Простые инструменты для инвесторов. Считайте доходность, FIRE-число и многое другое.
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-medium">Калькуляторы</h2>
        <ul>
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </ul>
      </section>
    </div>
  );
}
