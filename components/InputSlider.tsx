"use client";

import FieldLabel from "@/components/FieldLabel";
import { useNumberInput } from "@/hooks/useNumberInput";

type InputSliderProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
  className?: string;
};

export default function InputSlider({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
  className
}: InputSliderProps) {
  const inputId = `${label.replace(/\s+/g, "-").toLowerCase()}-number`;
  const input = useNumberInput({ value, onChange, min, max });

  return (
    <div className={`space-y-2 sm:col-span-2 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-3">
        <FieldLabel label={label} hint={hint} htmlFor={inputId} />
        <div className="flex items-center gap-1.5">
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            value={input.text}
            step={step}
            onChange={(event) => input.onChange(event.target.value)}
            onFocus={input.onFocus}
            onBlur={input.onBlur}
            className="input-fintech-sm"
          />
          {suffix ? <span className="text-xs text-text-muted">{suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-red-600 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
        aria-label={label}
      />
    </div>
  );
}
