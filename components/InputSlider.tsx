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
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className={`flex flex-col gap-4 sm:col-span-2 ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4">
        <FieldLabel label={label} hint={hint} htmlFor={inputId} />
        <div className="flex items-center gap-2">
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
          {suffix ? <span className="text-xs font-semibold text-text-muted">{suffix}</span> : null}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="relative z-10 h-2 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-text [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-brutal-sm"
          aria-label={label}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
