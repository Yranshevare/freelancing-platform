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
        circle:"rgb(4, 4, 47)",
      },
      boxShadow: {
        'innerShadow': 'inset 10px 10px 20px rgba(0, 0, 0, 0.6)',
        'top': '0px -5px 15px rgba(255, 255, 255, 0.4)',
      }
    },
  },
  plugins: [],
} satisfies Config;
