import type { Metadata } from "next";
import EmergencyFundCalculator from "@/components/EmergencyFundCalculator";
import PageHeader from "@/components/PageHeader";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Калькулятор подушки безопасности — сколько отложить",
  description:
    "Рассчитайте целевую сумму подушки безопасности, прогресс накопления и срок до цели при ваших расходах.",
  alternates: {
    canonical: "/emergency-fund"
  },
  openGraph: {
    title: "Калькулятор подушки безопасности — сколько отложить",
    description:
      "Рассчитайте целевую сумму подушки безопасности, прогресс накопления и срок до цели при ваших расходах.",
    url: `${siteUrl}/emergency-fund`
  }
};

export default function EmergencyFundPage() {
  return (
    <div className="container-main page-shell">
      <PageHeader
        badge="Безопасность"
        title="Калькулятор подушки безопасности"
        description="Узнайте, сколько нужно отложить на 3, 6 или 12 месяцев расходов и как быстро достичь цели."
      />
      <EmergencyFundCalculator />
    </div>
  );
}
