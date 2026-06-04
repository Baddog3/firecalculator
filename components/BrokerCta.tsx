import Link from "next/link";

export default function BrokerCta() {
  return (
    <section className="card border-border p-card">
      <p className="font-display text-lg font-semibold">Ищете брокера для инвестиций?</p>
      <p className="mt-2 text-sm text-text-muted">
        Сравните условия европейских брокеров для русскоязычных инвесторов.
      </p>
      <Link href="/blog/sravnenie-brokerov-evropa" className="btn-secondary mt-5">
        Сравнить брокеров →
      </Link>
    </section>
  );
}
