import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RentVsBuyCalculator from "@/components/RentVsBuyCalculator";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Аренда vs ипотека — что выгоднее купить или снимать",
  description:
    "Сравните покупку квартиры в ипотеку и аренду с инвестированием взноса. Калькулятор для России: ставка, рост аренды, рост цены жилья.",
  alternates: {
    canonical: "/rent-vs-buy"
  },
  openGraph: {
    title: "Аренда vs ипотека — что выгоднее купить или снимать",
    description:
      "Сравните покупку квартиры в ипотеку и аренду с инвестированием взноса. Калькулятор для России: ставка, рост аренды, рост цены жилья.",
    url: `${siteUrl}/rent-vs-buy`
  }
};

export default function RentVsBuyPage() {
  return (
    <div>
      <PageHeader
        title="Аренда vs ипотека"
        description="Сравните покупку квартиры в ипотеку и аренду с инвестированием взноса."
      />
      <RentVsBuyCalculator />
    </div>
  );
}
