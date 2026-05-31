import PageHeader from "@/components/PageHeader";

export default function DisclaimerPage() {
  return (
    <div>
      <PageHeader title="Дисклеймер" />

      <div className="card-fintech space-y-4 p-6 text-sm leading-relaxed">
        <p>
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
