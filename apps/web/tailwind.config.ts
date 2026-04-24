import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#0a0f1e",
        card: "#0d1526",
        accent: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        teal: {
          DEFAULT: "#14b8a6",
          foreground: "#ffffff",
        },
        txt: "#f1f5f9",
        muted: "#94a3b8",
        border: "rgba(255, 255, 255, 0.1)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        gradShift: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "grad-shift": "gradShift 8s ease infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
