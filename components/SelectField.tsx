import FieldLabel from "@/components/FieldLabel";

type SelectFieldProps = {
  label: string;
  hint?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
};

export default function SelectField({
  label,
  hint,
  value,
  options,
  onChange,
  className
}: SelectFieldProps) {
  const selectId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className={className}>
      <div className="mb-1">
        <FieldLabel label={label} hint={hint} htmlFor={selectId} />
      </div>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="input-fintech"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
