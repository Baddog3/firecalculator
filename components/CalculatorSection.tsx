import type { ReactNode } from "react";

type CalculatorSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function CalculatorSection({ title, description, children }: CalculatorSectionProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        {description ? <p className="mt-1 text-sm text-text-muted">{description}</p> : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}
