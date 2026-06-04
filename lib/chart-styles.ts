import { brand } from "@/lib/brand";

export const chartTooltipStyle = {
  borderRadius: "10px",
  border: `1px solid ${brand.border}`,
  boxShadow: "0 4px 12px rgba(28, 25, 23, 0.08)",
  fontSize: "13px",
  fontWeight: 500,
  background: brand.surface
} as const;
