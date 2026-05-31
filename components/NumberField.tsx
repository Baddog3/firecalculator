import FieldLabel from "@/components/FieldLabel";

type NumberFieldProps = {
  label: string;
  hint?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  helperText?: string;
  onChange: (value: number) => void;
};

export default function NumberField({
  label,
  hint,
  value,
  min = 0,
  max,
  step = 1,
  suffix,
  helperText,
  onChange
}: NumberFieldProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="rounded-none border border-border bg-bg-secondary p-4">
      <div className="mb-2">
        <FieldLabel label={label} hint={hint} htmlFor={inputId} />
      </div>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full border border-border bg-white px-3 py-2 font-mono"
        />
        {suffix ? <span className="shrink-0 text-sm text-text-muted">{suffix}</span> : null}
      </div>
      {helperText ? <p className="mt-2 text-xs text-text-muted">{helperText}</p> : null}
    </div>
  );
}
