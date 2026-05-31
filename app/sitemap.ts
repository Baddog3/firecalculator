import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const blogEntries = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date)
  }));

  return [
    { url: `${baseUrl}/`, lastModified: now },
    { url: `${baseUrl}/compound-interest`, lastModified: now },
    { url: `${baseUrl}/fire-calculator`, lastModified: now },
    { url: `${baseUrl}/blog`, lastModified: now },
    { url: `${baseUrl}/etf-calculator`, lastModified: now },
    { url: `${baseUrl}/rent-vs-buy`, lastModified: now },
    ...blogEntries
  ];
}
