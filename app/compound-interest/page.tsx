import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
import PageHeader from "@/components/PageHeader";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Калькулятор сложного процента — как растут инвестиции",
  description:
    "Рассчитайте, как растут ваши инвестиции с учётом ежемесячных пополнений и реинвестирования процентов.",
  alternates: {
    canonical: "/compound-interest"
  },
  openGraph: {
    title: "Калькулятор сложного процента — как растут инвестиции",
    description:
      "Рассчитайте, как растут ваши инвестиции с учётом ежемесячных пополнений и реинвестирования процентов.",
    url: `${siteUrl}/compound-interest`
  }
};

export default function CompoundInterestPage() {
  return (
    <div className="container-main page-shell">
      <PageHeader
        badge="Инвестиции"
        title="Калькулятор сложного процента"
        description="Рассчитайте рост капитала с учётом регулярных пополнений и реинвестирования процентов."
      />
      <CompoundInterestCalculator />
    </div>
  );
}
