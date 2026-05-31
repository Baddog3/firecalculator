import Link from "next/link";

export default function BrokerCta() {
  return (
    <section className="card-fintech p-4">
      <p className="text-sm">Ищете брокера для инвестиций?</p>
      <Link
        href="/blog/sravnenie-brokerov-evropa"
        className="mt-2 inline-block text-sm font-medium text-red-600 hover:text-red-700"
      >
        Сравнить брокеров →
      </Link>
    </section>
  );
}
