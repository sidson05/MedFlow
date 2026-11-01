/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        panel2: "var(--panel2)",
        line: "var(--line)",
        ink: "var(--tx)",
        muted: "var(--mut)",
        accent: "var(--acc)",
        accentSoft: "var(--acc-soft)",
        sage: "var(--sage)",
        forest: "var(--forest)",
        forestTx: "var(--forest-tx)",
        c1: "var(--c1)",
        c2: "var(--c2)",
        c3: "var(--c3)",
        c4: "var(--c4)",
        good: "var(--good)",
        bad: "var(--bad)",
        "risk-high": "var(--risk-high)",
        "risk-med": "var(--risk-med)",
        "risk-low": "var(--risk-low)",
      },
      fontFamily: {
        sans: ["Manrope", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      borderRadius: {
        card: "18px",
        pill: "9999px",
      },
    },
  },
  plugins: [],
}

