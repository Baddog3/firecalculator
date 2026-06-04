import type { Metadata } from "next";
import Link from "next/link";
import BlogPostList from "@/components/BlogPostList";
import CalculatorCard from "@/components/CalculatorCard";
import { calculatorIcons } from "@/lib/calculator-icons";
import { getAllPosts } from "@/lib/blog";
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
    key: "compound-interest" as const,
    title: "Сложный процент",
    description: "Рост капитала с регулярными пополнениями.",
    href: "/compound-interest",
    tag: "Инвестиции"
  },
  {
    key: "fire-calculator" as const,
    title: "FIRE-калькулятор",
    description: "Цель капитала и срок финансовой независимости.",
    href: "/fire-calculator",
    tag: "FIRE"
  },
  {
    key: "etf-calculator" as const,
    title: "Калькулятор ETF",
    description: "Доходность ETF с учётом комиссии TER.",
    href: "/etf-calculator",
    tag: "ETF"
  },
  {
    key: "rent-vs-buy" as const,
    title: "Аренда vs ипотека",
    description: "Сравнение покупки и аренды жилья.",
    href: "/rent-vs-buy",
    tag: "Недвижимость"
  }
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="container-main home-shell">
      <header className="mb-12 max-w-2xl">
        <h1 className="type-display">Финансовые калькуляторы</h1>
        <p className="mt-4 text-base text-text-muted sm:text-lg">
          Бесплатно · без регистрации · на русском языке
        </p>
      </header>

      <section className="mb-14">
        <ul className="grid-symmetric grid sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.href}
              title={calc.title}
              description={calc.description}
              href={calc.href}
              icon={calculatorIcons[calc.key]}
              tag={calc.tag}
              compact
            />
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="type-h2">Статьи</h2>
          <Link href="/blog" className="nav-link shrink-0">
            Смотреть все →
          </Link>
        </div>
        <BlogPostList posts={posts} compact />
      </section>
    </div>
  );
}
