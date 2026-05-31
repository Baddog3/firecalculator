import { readFile } from "fs/promises";
import { join } from "path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const alt = `${brand.name} — ${brand.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

async function loadLocalFont(filename: string) {
  return readFile(join(process.cwd(), "assets/fonts", filename));
}

export default async function OpenGraphImage() {
  const [interBold, interRegular, jetbrainsBold] = await Promise.all([
    loadLocalFont("Inter-Bold.woff"),
    loadLocalFont("Inter-Regular.woff"),
    loadLocalFont("JetBrainsMono-Bold.woff")
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: brand.bg,
          padding: "64px 72px"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span
            style={{
              color: brand.accent,
              fontSize: 36,
              fontWeight: 700,
              fontFamily: "JetBrains Mono"
            }}
          >
            {brand.name}
          </span>
          <span
            style={{
              color: brand.text,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
              fontFamily: "Inter"
            }}
          >
            {brand.title}
          </span>
          <span
            style={{
              color: brand.textMuted,
              fontSize: 32,
              lineHeight: 1.4,
              maxWidth: 820,
              fontFamily: "Inter"
            }}
          >
            {brand.tagline}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 120,
              height: 8,
              background: brand.accent,
              borderRadius: 999
            }}
          />
          <span style={{ color: brand.textMuted, fontSize: 24, fontFamily: "Inter" }}>
            Бесплатно · без регистрации
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interRegular, style: "normal", weight: 400 },
        { name: "Inter", data: interBold, style: "normal", weight: 700 },
        { name: "JetBrains Mono", data: jetbrainsBold, style: "normal", weight: 700 }
      ]
    }
  );
}
