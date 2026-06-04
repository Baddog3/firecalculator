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
          background: brand.primary,
          borderRadius: 32
        }}
      >
        <span
          style={{
            color: brand.primaryFg,
            fontSize: 88,
            fontWeight: 600,
            fontFamily: "Georgia, serif",
            lineHeight: 1
          }}
        >
          f
        </span>
        <span
          style={{
            color: brand.textSubtle,
            fontSize: 16,
            fontWeight: 500,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: 2,
            marginTop: 6
          }}
        >
          calc
        </span>
      </div>
    ),
    { ...size }
  );
}
