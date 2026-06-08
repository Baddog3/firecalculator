import type { LucideIcon } from "lucide-react";
import Link from "next/link";

type CalculatorCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tag?: string;
  compact?: boolean;
};

export default function CalculatorCard({
  title,
  description,
  href,
  icon: Icon,
  tag,
  compact = false
}: CalculatorCardProps) {
  if (compact) {
    return (
      <li>
        <Link href={href} className="card-calculator group flex items-center gap-3 p-4">
          <span className="icon-box-md group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-snug">{title}</p>
            {tag ? <p className="mt-0.5 text-xs text-accent/80">{tag}</p> : null}
          </div>
          <span className="shrink-0 text-sm text-text-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent">
            →
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className="flex">
      <Link href={href} className="card-interactive group flex w-full flex-col p-card">
        <div className="mb-5 flex items-start justify-between gap-4">
          <span className="icon-box-lg group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
            <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
          </span>
          {tag ? <span className="badge-accent">{tag}</span> : null}
        </div>
        <p className="font-display text-lg font-semibold leading-snug">{title}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{description}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-text-muted group-hover:text-accent">
          Открыть
          <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </Link>
    </li>
  );
}
