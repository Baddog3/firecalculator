import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  title: "Финансовые калькуляторы",
  description: "Калькуляторы для инвесторов на русском языке.",
  openGraph: {
    title: "Финансовые калькуляторы",
    description: "Калькуляторы для инвесторов на русском языке.",
    url: siteUrl,
    siteName: "Финансовые калькуляторы",
    locale: "ru_RU",
    type: "website"
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
