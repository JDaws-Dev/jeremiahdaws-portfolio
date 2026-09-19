import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  // No dark theme. Kept on the class strategy (and no .dark class is ever set)
  // so leftover dark: utilities stay inert instead of firing on prefers-color-scheme.
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
          DEFAULT: "#b3312c",
          muted: "#e0736b",
        },
        blue: {
          DEFAULT: "#2f5b96",
          soft: "#6f93c6",
          wash: "#eef3fa",
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
