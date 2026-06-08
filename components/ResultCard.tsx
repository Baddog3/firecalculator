import FieldLabel from "@/components/FieldLabel";

type ResultCardProps = {
  label: string;
  hint?: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
  variant?: "default" | "hero" | "compact";
  subtitleTone?: "default" | "success" | "warning";
  className?: string;
};

const subtitleToneClasses = {
  default: "text-text-muted",
  success: "text-success",
  warning: "text-warning"
};

export default function ResultCard({
  label,
  hint,
  value,
  subtitle,
  highlight = false,
  variant = "default",
  subtitleTone = "default",
  className
}: ResultCardProps) {
  if (variant === "hero") {
    return (
      <div className={`card border-accent/30 bg-accent-muted/20 p-card ${className ?? ""}`}>
        <p className="text-sm font-medium text-text-muted">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="type-metric mt-3 lg:text-4xl">{value}</p>
        {subtitle ? (
          <p className={`mt-3 text-sm leading-relaxed ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`card p-4 ${className ?? ""}`}>
        <p className="text-xs font-medium text-text-muted">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="mt-1 font-mono text-lg font-semibold tabular-nums">{value}</p>
        {subtitle ? (
          <p className={`mt-1 text-xs ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`card p-5 ${className ?? ""}`}>
      <p className="text-sm font-medium text-text-muted">
        <FieldLabel label={label} hint={hint} />
      </p>
      <p className={`font-mono font-semibold tabular-nums ${highlight ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
        {value}
      </p>
      {subtitle ? (
        <p className={`mt-2 text-sm ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
