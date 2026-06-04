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

        <h2 className="font-display text-xl font-semibold">Аналитика посещений</h2>
        <p className="text-text-muted">
          На сайте используется{" "}
          <a
            href="https://yandex.ru/legal/metrica_termsofuse/"
            className="text-text underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Метрика
          </a>
          : собираются обезличенные данные о просмотрах страниц, переходах по ссылкам, источниках трафика и
          технических параметрах устройства (через cookies и иные идентификаторы). Сервис помогает понимать, какие
          разделы полезны посетителям, и улучшать сайт. Отключить cookies можно в настройках браузера; это может
          ограничить работу отдельных функций сайта.
        </p>
      </div>
    </div>
  );
}
