import Link from "next/link";

export default function BrokerCta() {
  return (
    <section className="rounded-2xl border-2 border-text bg-accent p-card shadow-brutal">
      <p className="text-lg font-extrabold">Ищете брокера для инвестиций?</p>
      <p className="mt-2 text-sm text-text/70">Сравните условия европейских брокеров для русскоязычных инвесторов.</p>
      <Link
        href="/blog/sravnenie-brokerov-evropa"
        className="btn-secondary mt-6 bg-white/50 px-6 py-3 text-sm hover:bg-text hover:text-white"
      >
        Сравнить брокеров →
      </Link>
    </section>
  );
}
