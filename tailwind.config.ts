import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["DM Sans", "sans-serif"],
        display: ["Cormorant Garamond", "serif"],
        heading: ["Cormorant Garamond", "serif"],
      },
      colors: {
        rose:  { DEFAULT: "#D4614A", light: "#F5E6E2", dark: "#A8402C" },
        teal:  { DEFAULT: "#1E6B5E", light: "#E0F0EC" },
        gold:  { DEFAULT: "#C9964A", light: "#F5ECD8" },
        ink:   "#0D0D0D",
        cream: "#FAF7F0",
        mist:  "#F2EFE8",
        primary:   { DEFAULT: "var(--rose)",   foreground: "#fff" },
        secondary: { DEFAULT: "var(--teal)",   foreground: "#fff" },
        background: "var(--cream)",
        foreground: "var(--ink)",
        border: "rgba(13,13,13,0.1)",
        input:  "rgba(13,13,13,0.08)",
        ring:   "var(--rose)",
        muted: { DEFAULT: "var(--mist)", foreground: "rgba(13,13,13,0.5)" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "float":     "float 4s ease-in-out infinite",
        "coin-fall": "coin-fall linear infinite",
        "ticker":    "ticker 34s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-7px)" },
          "50%":       { transform: "translateY(7px)"  },
        },
        "coin-fall": {
          "0%":   { transform: "translateY(-60px) rotate(0deg)",   opacity: "0"   },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "0.6" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0"   },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      boxShadow: {
        "rose-lg":    "0 12px 32px -8px rgba(212,97,74,0.45)",
        "soft-xl":    "0 24px 80px -16px rgba(0,0,0,0.08)",
        "card-hover": "0 24px 60px -12px rgba(0,0,0,0.13)",
      },
    },
  },
  plugins: [],
};

export default config;