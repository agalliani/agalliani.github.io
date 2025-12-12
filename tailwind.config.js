/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Extracted from profile photo (assumed dark suit/background)
        primary: {
          DEFAULT: '#0F172A', // Slate 900 (Dark Suit/Background)
          light: '#1E293B',   // Slate 800
          dark: '#020617',    // Slate 950
        },
        // Extracted from profile photo (assumed tie/lanyard/screen)
        accent: {
          DEFAULT: '#F59E0B', // Amber 500 (Warm accent)
          hover: '#D97706',   // Amber 600
          secondary: '#14B8A6', // Teal 500 (Code/Tech accent)
        },
        // Backgrounds
        bg: {
          dark: '#0F172A',    // Main background
          card: 'rgba(30, 41, 59, 0.7)', // Glassmorphism card
        },
        // Text
        text: {
          main: '#E2E8F0',    // Slate 200
          muted: '#94A3B8',   // Slate 400
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
