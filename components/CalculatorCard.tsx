import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function CalculatorCard({ title, description, href }: CalculatorCardProps) {
  return (
    <li>
      <Link
        href={href}
        className="card-fintech group block p-5 transition-shadow hover:border-red-100 hover:shadow-md"
      >
        <p className="font-semibold transition-colors group-hover:text-red-600">{title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{description}</p>
        <span className="mt-3 inline-block text-sm font-medium text-red-600">Открыть →</span>
      </Link>
    </li>
  );
}
