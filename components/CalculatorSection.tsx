import type { ReactNode } from "react";

type CalculatorSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function CalculatorSection({ title, description, children }: CalculatorSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="type-h2">{title}</h2>
        {description ? <p className="mt-1.5 text-sm text-text-muted">{description}</p> : null}
      </div>
      <div className="card p-card">
        <div className="grid-symmetric grid sm:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}
