import type { Metadata } from "next";
import Link from "next/link";
import BlogPostList from "@/components/BlogPostList";
import CalculatorCard from "@/components/CalculatorCard";
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
    title: "Сложный процент",
    description: "Рост капитала с регулярными пополнениями.",
    href: "/compound-interest",
    emoji: "📈",
    tag: "Инвестиции"
  },
  {
    title: "FIRE-калькулятор",
    description: "Цель капитала и срок финансовой независимости.",
    href: "/fire-calculator",
    emoji: "🔥",
    tag: "FIRE"
  },
  {
    title: "Калькулятор ETF",
    description: "Доходность ETF с учётом комиссии TER.",
    href: "/etf-calculator",
    emoji: "💹",
    tag: "ETF"
  },
  {
    title: "Аренда vs ипотека",
    description: "Сравнение покупки и аренды жилья.",
    href: "/rent-vs-buy",
    emoji: "🏠",
    tag: "Недвижимость"
  }
];

export default function HomePage() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <div className="container-main home-shell">
      <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Финансовые калькуляторы</h1>
          <p className="mt-1 text-sm text-text-muted">
            Бесплатно · без регистрации · на русском языке
          </p>
        </div>
        <Link href="/blog" className="text-sm font-bold hover:text-text-muted">
          Все статьи →
        </Link>
      </header>

      <section className="mb-10">
        <ul className="grid-symmetric grid sm:grid-cols-2 lg:grid-cols-4">
          {calculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} compact />
          ))}
        </ul>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-extrabold sm:text-xl">Статьи</h2>
          <Link href="/blog" className="text-sm font-bold text-text-muted hover:text-text">
            Смотреть все →
          </Link>
        </div>
        <BlogPostList posts={posts} compact />
      </section>
    </div>
  );
}
