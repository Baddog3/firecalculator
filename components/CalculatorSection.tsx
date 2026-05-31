import type { ReactNode } from "react";

type CalculatorSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function CalculatorSection({ title, description, children }: CalculatorSectionProps) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {description ? <p className="mt-0.5 text-sm text-text-muted">{description}</p> : null}
      </div>
      <div className="card-fintech p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}
