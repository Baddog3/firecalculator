type InputSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
};

export default function InputSlider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange
}: InputSliderProps) {
  return (
    <div className="rounded-none border border-border bg-bg-secondary p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <label className="text-sm">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={Number.isFinite(value) ? value : 0}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onChange(Number(event.target.value))}
            className="w-28 border border-border bg-white px-2 py-1 text-right font-mono text-sm"
          />
          {suffix ? <span className="text-sm text-text-muted">{suffix}</span> : null}
        </div>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-accent"
      />
    </div>
  );
}
