"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const calculators = [
  { href: "/compound-interest", label: "Сложный процент" },
  { href: "/fire-calculator", label: "FIRE" },
  { href: "/etf-calculator", label: "ETF" },
  { href: "/rent-vs-buy", label: "Аренда vs ипотека" }
];

function linkClass(isActive: boolean) {
  return isActive
    ? "font-medium text-red-600"
    : "text-text-muted transition-colors hover:text-red-600";
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isCalculatorsActive =
    pathname === "/" || calculators.some((item) => pathname.startsWith(item.href));
  const isBlogActive = pathname.startsWith("/blog");

  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-sm">
      <div className="container-main py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold text-red-600">
            fincalc.ru
          </Link>

          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm text-text-muted transition-colors hover:bg-stone-50 hover:text-red-600 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Открыть меню"
          >
            Меню
          </button>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link href="/" className={linkClass(isCalculatorsActive)}>
              Калькуляторы
            </Link>
            <Link href="/blog" className={linkClass(isBlogActive)}>
              Блог
            </Link>
          </nav>
        </div>

        {open ? (
          <nav className="mt-3 border-t border-border pt-3 md:hidden">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-muted">Калькуляторы</p>
            <ul className="space-y-1">
              {calculators.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-2 py-1.5 text-sm ${linkClass(pathname.startsWith(item.href))}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={`mt-3 block rounded-lg px-2 py-1.5 text-sm ${linkClass(isBlogActive)}`}
            >
              Блог
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
