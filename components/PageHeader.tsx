type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  centered?: boolean;
};

export default function PageHeader({ title, description, badge, centered = false }: PageHeaderProps) {
  return (
    <header className={`section-head animate-fade-up ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {badge ? <span className="badge-accent mb-4 inline-flex">{badge}</span> : null}
      <h1 className="type-h1">{title}</h1>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">{description}</p>
      ) : null}
      <div className={`accent-rule mt-6 ${centered ? "mx-auto" : ""}`} />
    </header>
  );
}
