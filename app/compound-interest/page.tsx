import type { Metadata } from "next";
import CompoundInterestCalculator from "@/components/CompoundInterestCalculator";
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
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Калькулятор сложного процента</h1>
      <CompoundInterestCalculator />
    </div>
  );
}
