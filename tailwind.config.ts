import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b0d10",
          muted: "#5b6068",
        },
        paper: {
          DEFAULT: "#fafaf7",
          muted: "#eceae3",
        },
        accent: {
          DEFAULT: "#b8431f",
          muted: "#d97757",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Inter", "sans-serif"],
        serif: ["ui-serif", "Georgia", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
} satisfies Config;
