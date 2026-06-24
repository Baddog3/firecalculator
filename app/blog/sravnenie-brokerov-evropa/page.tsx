"use client";

import { useEffect } from "react";
import Link from "@/components/Link";

export default function BrokerComparisonEuropeRedirectPage() {
  useEffect(() => {
    window.location.replace("/blog/sravnenie-brokerov-rossiya/");
  }, []);

  return (
    <div className="container-main page-shell">
      <p className="text-text-muted">
        Страница переехала.{" "}
        <Link href="/blog/sravnenie-brokerov-rossiya/" className="text-accent hover:underline">
          Перейти к сравнению брокеров в России
        </Link>
      </p>
    </div>
  );
}
