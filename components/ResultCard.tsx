type ResultCardProps = {
  label: string;
  value: string;
  subtitle?: string;
  highlight?: boolean;
};

export default function ResultCard({
  label,
  value,
  subtitle,
  highlight = false
}: ResultCardProps) {
  return (
    <div className="rounded-none border border-border bg-bg-secondary p-4">
      <p className="text-sm text-text-muted">{label}</p>
      <p className={`font-mono ${highlight ? "text-3xl font-semibold" : "text-2xl"}`}>{value}</p>
      {subtitle ? <p className="mt-1 text-sm text-text-muted">{subtitle}</p> : null}
    </div>
  );
}
