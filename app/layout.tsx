import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Literata } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
import { brand } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";
import "@/styles/globals.css";

const siteUrl = getSiteUrl();

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans"
});

const literata = Literata({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-literata"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.title,
    template: `%s — ${brand.name}`
  },
  description: "Калькуляторы для инвесторов на русском языке: FIRE, подушка безопасности, сложный процент, ETF и аренда vs ипотека.",
  applicationName: brand.name,
  openGraph: {
    title: brand.title,
    description: "Калькуляторы для инвесторов на русском языке: FIRE, подушка безопасности, сложный процент, ETF и аренда vs ипотека.",
    url: siteUrl,
    siteName: brand.name,
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: brand.title,
    description: "Калькуляторы для инвесторов на русском языке: FIRE, сложный процент, ETF и аренда vs ипотека."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body
        className={`${plexSans.variable} ${literata.variable} ${jetbrainsMono.variable} min-h-screen bg-bg font-sans text-text antialiased`}
      >
        <div className="site-bg" aria-hidden />
        <YandexMetrika />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
