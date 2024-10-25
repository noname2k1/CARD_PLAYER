import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        faded: {
          "0%": { opacity: "0" },
          "50%": { opacity: "50" },
          "100%": { opacity: "100" },
        },
      },
      animation: {
        faded2: "faded 2s ease-in-out",
        faded1: "faded 1s ease-in-out",
        "faded0.5": "faded 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
