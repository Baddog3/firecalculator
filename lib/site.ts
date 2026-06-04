export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "https://firecalc.ru";
  return url.replace(/\/$/, "");
}
