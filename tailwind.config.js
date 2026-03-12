/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040405', // Pitch black with slight tint
        surface: '#111114',    // Very dark grey
        accent: '#8B5CF6',     // Electric Purple
        foreground: '#F8FAFC', // White text
        slate: '#27272A'       // Subtle border color
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
