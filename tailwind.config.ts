import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: "#0f172a",
        "surface-hover": "#1e293b",
        indigo: {
          accent: "#6366f1",
          glow: "#818cf8",
        },
        violet: {
          accent: "#8b5cf6",
          glow: "#a78bfa",
        },
      },
    },
  },
};

export default config;