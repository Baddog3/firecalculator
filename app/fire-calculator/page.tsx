import type { Metadata } from "next";
import FireCalculator from "@/components/FireCalculator";

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
    url: "https://yourdomain.com/fire-calculator"
  }
};

export default function FireCalculatorPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">FIRE-калькулятор</h1>
      <FireCalculator />
    </div>
  );
}
