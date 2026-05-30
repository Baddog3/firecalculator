import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/compound-interest`, lastModified: now },
    { url: `${baseUrl}/fire-calculator`, lastModified: now },
    { url: `${baseUrl}/blog`, lastModified: now },
    { url: `${baseUrl}/etf-calculator`, lastModified: now },
    { url: `${baseUrl}/rent-vs-buy`, lastModified: now }
  ];
}
