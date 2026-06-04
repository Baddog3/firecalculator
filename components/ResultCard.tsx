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
      <div className="rounded-2xl border-2 border-text bg-bg-dark p-card shadow-brutal-accent">
        <p className="text-sm font-bold text-accent">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="mt-3 font-mono text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {value}
        </p>
        {subtitle ? (
          <p className={`mt-4 text-sm ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`rounded-xl border-2 border-border bg-white p-4 ${className ?? ""}`}>
        <p className="text-xs font-semibold text-text-muted">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="mt-1 font-mono text-lg font-bold">{value}</p>
        {subtitle ? (
          <p className={`mt-1 text-xs ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`rounded-xl border-2 border-border bg-white p-5 ${className ?? ""}`}>
      <p className="text-sm font-semibold text-text-muted">
        <FieldLabel label={label} hint={hint} />
      </p>
      <p className={`font-mono font-bold ${highlight ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{value}</p>
      {subtitle ? (
        <p className={`mt-2 text-sm ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
