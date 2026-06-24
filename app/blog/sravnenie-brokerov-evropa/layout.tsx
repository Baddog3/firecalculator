import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: {
    canonical: "/blog/sravnenie-brokerov-rossiya/"
  }
};

export default function BrokerComparisonEuropeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
