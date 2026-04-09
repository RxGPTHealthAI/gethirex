import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          primary: "#1C2351",
          dark: "#0F1425",
          light: "#2A355C",
        },
        cyan: {
          cta: "#00E5FF",
        },
        teal: {
          links: "#00BFA6",
        },
        gold: {
          accent: "#FFD700",
        },
        gray: {
          soft: "#F2F3F5",
          ultra: "#F1F2F2",
        },
        brand: {
          primary: "#1C2351",
          bg: "#0F1425",
          surface: "#1a2040",
          border: "#2A355C",
          cyan: "#00E5FF",
          teal: "#00BFA6",
          gold: "#FFD700",
        },
      },
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0F1425 0%, #1C2351 50%, #0F1425 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(28,35,81,0.6) 0%, rgba(15,20,37,0.8) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
