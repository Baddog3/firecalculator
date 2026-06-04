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
        "bg-secondary": "var(--bg-secondary)",
        "bg-dark": "var(--bg-dark)",
        border: "var(--border)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-light": "var(--accent-light)",
        "accent-border": "var(--accent-border)",
        success: "var(--success)",
        warning: "var(--warning)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"]
      },
      spacing: {
        section: "var(--space-section)",
        block: "var(--space-block)",
        card: "var(--space-card)"
      },
      maxWidth: {
        container: "var(--container-max)"
      },
      boxShadow: {
        brutal: "3px 3px 0 0 #000000",
        "brutal-sm": "2px 2px 0 0 #000000",
        "brutal-accent": "3px 3px 0 0 #d4ff00"
      }
    }
  },
  plugins: []
};

export default config;
