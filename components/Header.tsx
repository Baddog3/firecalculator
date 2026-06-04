"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand } from "@/lib/brand";

const calculators = [
  { href: "/compound-interest", label: "Сложный процент" },
  { href: "/fire-calculator", label: "FIRE" },
  { href: "/etf-calculator", label: "ETF" },
  { href: "/rent-vs-buy", label: "Аренда vs ипотека" }
];

function navLinkClass(isActive: boolean) {
  return isActive
    ? "rounded-full bg-text px-5 py-2.5 font-bold text-white"
    : "rounded-full px-5 py-2.5 font-semibold text-text-muted transition-colors hover:bg-white hover:text-text";
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isCalculatorsActive =
    pathname === "/" || calculators.some((item) => pathname.startsWith(item.href));
  const isBlogActive = pathname.startsWith("/blog");

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border bg-bg/90 backdrop-blur-md">
      <div className="container-main flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-mono text-sm font-bold text-text shadow-brutal-sm transition-transform group-hover:-translate-y-0.5">
            fc
          </span>
          <span className="text-lg font-extrabold tracking-tight">{brand.name}</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <Link href="/" className={navLinkClass(isCalculatorsActive)}>
            Калькуляторы
          </Link>
          <Link href="/blog" className={navLinkClass(isBlogActive)}>
            Блог
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-border bg-white text-lg transition-all hover:border-text hover:shadow-brutal-sm md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Открыть меню"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open ? (
        <nav className="container-main border-t-2 border-border pb-6 pt-4 md:hidden">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-text-muted">Калькуляторы</p>
          <ul className="grid gap-2">
            {calculators.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-semibold ${
                    pathname.startsWith(item.href)
                      ? "bg-accent text-text"
                      : "text-text-muted hover:bg-white hover:text-text"
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
            className={`mt-2 block rounded-xl px-4 py-3 text-sm font-semibold ${
              isBlogActive ? "bg-accent text-text" : "text-text-muted hover:bg-white hover:text-text"
            }`}
          >
            Блог
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
