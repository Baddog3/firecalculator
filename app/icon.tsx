import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: brand.primary,
          borderRadius: 6
        }}
      >
        <span
          style={{
            color: brand.primaryFg,
            fontSize: 20,
            fontWeight: 600,
            fontFamily: "Georgia, serif"
          }}
        >
          f
        </span>
      </div>
    ),
    { ...size }
  );
}
