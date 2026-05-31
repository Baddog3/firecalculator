import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Главная" },
  { href: "/compound-interest", label: "Сложный процент" },
  { href: "/fire-calculator", label: "FIRE" },
  { href: "/etf-calculator", label: "ETF" },
  { href: "/rent-vs-buy", label: "Аренда vs ипотека" },
  { href: "/blog", label: "Блог" },
  { href: "/disclaimer", label: "Дисклеймер" }
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="container-main py-8 text-sm">
        <nav className="mb-4 flex flex-wrap gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-muted transition-colors hover:text-red-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-text-muted">
          Сайт носит информационный характер и не является финансовой рекомендацией.
        </p>
        <p className="mt-3 font-mono text-xs text-text-muted">© {new Date().getFullYear()} fincalc.ru</p>
      </div>
    </footer>
  );
}
