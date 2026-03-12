/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface:    'rgb(var(--color-surface)    / <alpha-value>)',
        accent:     'rgb(var(--color-accent)     / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        slate:      'rgb(var(--color-slate)      / <alpha-value>)',
      },
      fontFamily: {
        heading: ['"Outfit"', 'sans-serif'],
        drama: ['"Instrument Serif"', 'serif'],
        mono: ['"Fira Code"', 'monospace']
      }
    },
  },
  plugins: [],
}
