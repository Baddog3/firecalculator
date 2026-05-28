"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-border">
      <div className="container-main py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-mono text-sm">
            fincalc.ru
          </Link>

          <button
            type="button"
            className="text-sm md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Открыть меню"
          >
            Меню
          </button>

          <nav className="hidden gap-6 text-sm md:flex">
            <Link href="/" className="hover:text-accent-hover">
              Калькуляторы
            </Link>
            <Link href="/blog" className="hover:text-accent-hover">
              Блог
            </Link>
          </nav>
        </div>

        {open ? (
          <nav className="mt-3 flex flex-col gap-2 border-t border-border pt-3 text-sm md:hidden">
            <Link href="/" onClick={() => setOpen(false)}>
              Калькуляторы
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)}>
              Блог
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
