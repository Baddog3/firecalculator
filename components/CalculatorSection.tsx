import type { ReactNode } from "react";

type CalculatorSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function CalculatorSection({ title, description, children }: CalculatorSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        {description ? <p className="mt-2 text-sm text-text-muted">{description}</p> : null}
      </div>
      <div className="card-fintech p-card">
        <div className="grid-symmetric grid sm:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}
