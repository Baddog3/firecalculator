type PageHeaderProps = {
  title: string;
  description?: string;
  badge?: string;
  centered?: boolean;
};

export default function PageHeader({ title, description, badge, centered = false }: PageHeaderProps) {
  return (
    <header className={`section-head ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      {badge ? <span className="badge mb-5">{badge}</span> : null}
      <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{title}</h1>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">{description}</p>
      ) : null}
    </header>
  );
}
