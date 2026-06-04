import FieldHint from "@/components/FieldHint";

type FieldLabelProps = {
  label: string;
  hint?: string;
  htmlFor?: string;
};

export default function FieldLabel({ label, hint, htmlFor }: FieldLabelProps) {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center text-sm font-medium text-text">
      {label}
      {hint ? <FieldHint hint={hint} /> : null}
    </label>
  );
}
