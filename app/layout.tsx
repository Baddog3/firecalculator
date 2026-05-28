import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";

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
  metadataBase: new URL("https://yourdomain.com"),
  title: "Финансовые калькуляторы",
  description: "Калькуляторы для инвесторов на русском языке.",
  openGraph: {
    title: "Финансовые калькуляторы",
    description: "Калькуляторы для инвесторов на русском языке.",
    url: "https://yourdomain.com",
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
