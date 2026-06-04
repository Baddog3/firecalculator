import type { Metadata } from "next";
import FireCalculator from "@/components/FireCalculator";
import PageHeader from "@/components/PageHeader";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "FIRE-калькулятор — путь к финансовой независимости",
  description:
    "Оцените FIRE-цель, нужный капитал и срок выхода на финансовую независимость с учётом инфляции и доходности.",
  alternates: {
    canonical: "/fire-calculator"
  },
  openGraph: {
    title: "FIRE-калькулятор — путь к финансовой независимости",
    description:
      "Оцените FIRE-цель, нужный капитал и срок выхода на финансовую независимость с учётом инфляции и доходности.",
    url: `${siteUrl}/fire-calculator`
  }
};

export default function FireCalculatorPage() {
  return (
    <div className="container-main page-shell">
      <PageHeader
        badge="FIRE"
        title="FIRE-калькулятор"
        description="Рассчитайте цель капитала и срок выхода на финансовую независимость."
      />
      <FireCalculator />
    </div>
  );
}
