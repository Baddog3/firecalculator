import PageHeader from "@/components/PageHeader";

export default function DisclaimerPage() {
  return (
    <div className="container-main page-shell">
      <PageHeader title="Дисклеймер" />

      <div className="card mx-auto max-w-prose space-y-6 p-card text-base leading-relaxed">
        <p className="font-medium">
          Информация на сайте представлена в образовательных целях и не является индивидуальной инвестиционной
          рекомендацией.
        </p>
        <p className="text-text-muted">
          Результаты калькуляторов основаны на введённых вами данных и допущениях. Фактическая доходность может
          отличаться. Перед принятием финансовых решений проконсультируйтесь со специалистом.
        </p>
      </div>
    </div>
  );
}
