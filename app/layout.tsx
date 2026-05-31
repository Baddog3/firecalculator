import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { brand } from "@/lib/brand";
import { getSiteUrl } from "@/lib/site";
import "@/styles/globals.css";

const siteUrl = getSiteUrl();

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: brand.title,
    template: `%s — ${brand.name}`
  },
  description: "Калькуляторы для инвесторов на русском языке: FIRE, сложный процент, ETF и аренда vs ипотека.",
  applicationName: brand.name,
  openGraph: {
    title: brand.title,
    description: "Калькуляторы для инвесторов на русском языке: FIRE, сложный процент, ETF и аренда vs ипотека.",
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Header />
        <main className="container-main py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
