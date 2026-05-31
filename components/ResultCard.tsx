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
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-red-800/70">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="mt-1 font-mono text-3xl font-semibold tracking-tight text-red-700 sm:text-4xl">{value}</p>
        {subtitle ? (
          <p className={`mt-2 text-sm ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`rounded-lg border border-border bg-white p-3 shadow-sm ${className ?? ""}`}>
        <p className="text-xs text-text-muted">
          <FieldLabel label={label} hint={hint} />
        </p>
        <p className="mt-0.5 font-mono text-lg font-medium">{value}</p>
        {subtitle ? (
          <p className={`mt-0.5 text-xs ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={`rounded-lg border border-border bg-white p-4 shadow-sm ${className ?? ""}`}>
      <p className="text-sm text-text-muted">
        <FieldLabel label={label} hint={hint} />
      </p>
      <p className={`font-mono ${highlight ? "text-3xl font-semibold text-red-700" : "text-2xl"}`}>{value}</p>
      {subtitle ? (
        <p className={`mt-1 text-sm ${subtitleToneClasses[subtitleTone]}`}>{subtitle}</p>
      ) : null}
    </div>
  );
}
