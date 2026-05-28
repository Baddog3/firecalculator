import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="container-main py-8 text-sm">
        <nav className="mb-4 flex flex-wrap gap-4">
          <Link href="/">Главная</Link>
          <Link href="/">Калькуляторы</Link>
          <Link href="/blog">Блог</Link>
          <Link href="/disclaimer">Дисклеймер</Link>
        </nav>
        <p className="text-text-muted">
          Сайт носит информационный характер и не является финансовой рекомендацией.
        </p>
        <p className="mt-3 text-text-muted">© {new Date().getFullYear()} fincalc.ru</p>
      </div>
    </footer>
  );
}
