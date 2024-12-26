import type { Config } from "tailwindcss";

export default {
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
        heroBlue:'#030324',
        headerBackground:"rgba(3,3,36,0.2)",
        cardBackground:"rgba(225,225,225,0.2)",
        90:"90%",
      },
    },
  },
  plugins: [],
} satisfies Config;
