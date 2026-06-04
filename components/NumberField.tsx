"use client";

import FieldLabel from "@/components/FieldLabel";
import { useNumberInput } from "@/hooks/useNumberInput";

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
  formatThousands?: boolean;
  className?: string;
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
  onChange,
  formatThousands = false,
  className
}: NumberFieldProps) {
  const inputId = label.replace(/\s+/g, "-").toLowerCase();
  const input = useNumberInput({ value, onChange, min, max, formatThousands });

  return (
    <div className={className}>
      <div className="mb-1">
        <FieldLabel label={label} hint={hint} htmlFor={inputId} />
      </div>
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          inputMode={formatThousands ? "numeric" : "decimal"}
          value={input.text}
          step={step}
          onChange={(event) => input.onChange(event.target.value)}
          onFocus={input.onFocus}
          onBlur={input.onBlur}
          className="input"
        />
        {suffix ? <span className="shrink-0 text-xs text-text-muted">{suffix}</span> : null}
      </div>
      {helperText ? <p className="mt-1 text-xs text-text-muted">{helperText}</p> : null}
    </div>
  );
}
