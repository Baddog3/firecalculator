import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-raised": "var(--surface-raised)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        "text-subtle": "var(--text-subtle)",
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        "primary-fg": "var(--primary-fg)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-fg": "var(--accent-fg)",
        "accent-muted": "var(--accent-muted)",
        gold: "var(--gold)",
        "gold-muted": "var(--gold-muted)",
        ring: "var(--ring)",
        success: "var(--success)",
        warning: "var(--warning)",
        "chart-1": "var(--chart-1)",
        "chart-2": "var(--chart-2)",
        "chart-grid": "var(--chart-grid)"
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-literata)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"]
      },
      spacing: {
        section: "var(--space-section)",
        block: "var(--space-block)",
        card: "var(--space-card)"
      },
      maxWidth: {
        container: "var(--container-max)",
        prose: "65ch"
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)"
      },
      boxShadow: {
        sm: "0 1px 3px rgba(26, 24, 20, 0.06)",
        md: "0 4px 16px rgba(26, 24, 20, 0.08)",
        accent: "0 4px 20px rgba(29, 107, 79, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
