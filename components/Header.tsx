"use client";

import { Menu, X } from "lucide-react";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand } from "@/lib/brand";

const calculators = [
  { href: "/compound-interest", label: "Сложный процент" },
  { href: "/fire-calculator", label: "FIRE" },
  { href: "/etf-calculator", label: "ETF" },
  { href: "/emergency-fund", label: "Подушка" },
  { href: "/rent-vs-buy", label: "Аренда vs ипотека" }
];

function navLinkClass(isActive: boolean) {
  return isActive ? "nav-link-active" : "nav-link";
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isCalculatorsActive =
    pathname === "/" || calculators.some((item) => pathname.startsWith(item.href));
  const isBlogActive = pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/85 backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent font-display text-sm font-semibold text-accent-fg transition-colors group-hover:bg-accent-hover">
            fc
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className={navLinkClass(isCalculatorsActive)}>
            Калькуляторы
          </Link>
          <Link href="/blog" className={navLinkClass(isBlogActive)}>
            Блог
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-text transition-colors hover:border-accent hover:bg-accent-muted md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </div>

      {open ? (
        <nav className="container-main border-t border-border pb-6 pt-4 md:hidden">
          <p className="mb-3 type-caption font-semibold uppercase tracking-wider">Калькуляторы</p>
          <ul className="grid gap-1">
            {calculators.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm ${
                    pathname.startsWith(item.href)
                      ? "bg-accent-muted font-semibold text-accent"
                      : "font-medium text-text-muted hover:bg-accent-muted hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/blog"
            onClick={() => setOpen(false)}
            className={`mt-2 block rounded-md px-3 py-2.5 text-sm ${
              isBlogActive
                ? "bg-accent-muted font-semibold text-accent"
                : "font-medium text-text-muted hover:bg-accent-muted hover:text-accent"
            }`}
          >
            Блог
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
