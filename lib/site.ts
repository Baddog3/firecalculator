export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firecalculator-doir.vercel.app";
  return url.replace(/\/$/, "");
}
