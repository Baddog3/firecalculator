import Link from "@/components/Link";
import { brand } from "@/lib/brand";

const footerSections = [
  {
    title: "Калькуляторы",
    links: [
      { href: "/compound-interest", label: "Сложный процент" },
      { href: "/fire-calculator", label: "FIRE" },
      { href: "/etf-calculator", label: "ETF" },
      { href: "/emergency-fund", label: "Подушка безопасности" },
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
    <footer className="mt-auto border-t border-border bg-surface/60">
      <div className="container-main py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-sm font-semibold text-accent-fg">
                fc
              </span>
              <span className="font-display text-lg font-semibold">{brand.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              Бесплатные финансовые калькуляторы для инвесторов. Считайте доходность, FIRE-число и многое другое.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <p className="type-caption font-semibold uppercase tracking-wider">{section.title}</p>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-text-muted">
            Сайт носит информационный характер и не является финансовой рекомендацией.
          </p>
          <p className="font-mono text-xs text-text-subtle">
            © {new Date().getFullYear()} {brand.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
