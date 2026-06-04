import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: brand.accent,
          borderRadius: 36
        }}
      >
        <span
          style={{
            color: brand.text,
            fontSize: 96,
            fontWeight: 700,
            fontFamily: "ui-monospace, monospace",
            lineHeight: 1
          }}
        >
          f
        </span>
        <span
          style={{
            color: brand.textMuted,
            fontSize: 18,
            fontWeight: 600,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 1,
            marginTop: 8
          }}
        >
          calc
        </span>
      </div>
    ),
    { ...size }
  );
}
