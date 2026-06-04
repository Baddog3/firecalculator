import Link from "next/link";
import { brand } from "@/lib/brand";

const footerSections = [
  {
    title: "Калькуляторы",
    links: [
      { href: "/compound-interest", label: "Сложный процент" },
      { href: "/fire-calculator", label: "FIRE" },
      { href: "/etf-calculator", label: "ETF" },
      { href: "/rent-vs-buy", label: "Аренда vs ипотека" }
    ]
  },
  {
    title: "Сайт",
    links: [
      { href: "/", label: "Главная" },
      { href: "/blog", label: "Блог" },
      { href: "/disclaimer", label: "Дисклеймер" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-border bg-bg-dark text-white">
      <div className="container-main section-y">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold text-text">
                fc
              </span>
              <span className="text-lg font-extrabold">{brand.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Бесплатные финансовые калькуляторы для инвесторов. Считайте доходность, FIRE-число и многое другое.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">{section.title}</p>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/50">
            Сайт носит информационный характер и не является финансовой рекомендацией.
          </p>
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
