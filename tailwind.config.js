/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Dynamic theme colors - safelist patterns for all theme colors
    {
      pattern:
        /^(bg|text|border|from|to|via|ring|outline)-(purple|pink|orange|emerald|teal|lime|blue|cyan|sky|rose|red|amber)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern:
        /^hover:(bg|text|border)-(purple|pink|orange|emerald|teal|lime|blue|cyan|sky|rose|red|amber)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    {
      pattern:
        /^focus:(bg|text|border|ring|outline)-(purple|pink|orange|emerald|teal|lime|blue|cyan|sky|rose|red|amber)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
