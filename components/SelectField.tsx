import FieldLabel from "@/components/FieldLabel";

type SelectFieldProps = {
  label: string;
  hint?: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
};

export default function SelectField({ label, hint, value, options, onChange }: SelectFieldProps) {
  const selectId = label.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="rounded-none border border-border bg-bg-secondary p-4">
      <div className="mb-2">
        <FieldLabel label={label} hint={hint} htmlFor={selectId} />
      </div>
      <select
        id={selectId}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full border border-border bg-white px-3 py-2"
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
