import type { Metadata } from "next";
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
      <h1 className="mb-6 text-3xl font-semibold">Аренда vs ипотека</h1>
      <RentVsBuyCalculator />
    </div>
  );
}
