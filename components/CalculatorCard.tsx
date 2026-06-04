import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  emoji: string;
  tag?: string;
  compact?: boolean;
};

export default function CalculatorCard({
  title,
  description,
  href,
  emoji,
  tag,
  compact = false
}: CalculatorCardProps) {
  if (compact) {
    return (
      <li>
        <Link
          href={href}
          className="card-calculator-compact group flex items-center gap-3 p-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-base">
            {emoji}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold leading-snug">{title}</p>
            {tag ? (
              <p className="mt-0.5 text-xs font-medium text-text-muted">{tag}</p>
            ) : null}
          </div>
          <span className="shrink-0 text-sm text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-text">
            →
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className="flex">
      <Link href={href} className="card-fintech-hover group flex w-full flex-col p-card">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent text-2xl shadow-brutal-sm">
            {emoji}
          </span>
          {tag ? (
            <span className="rounded-full border-2 border-border px-3 py-1 text-xs font-bold uppercase tracking-wide text-text-muted">
              {tag}
            </span>
          ) : null}
        </div>
        <p className="text-xl font-extrabold leading-snug">{title}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">
          Открыть
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </li>
  );
}
