/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- C'est ici que la magie opère
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Tu peux définir tes couleurs personnalisées ici si besoin
        parchment: '#fdfcf8',
        ink: '#0d0d0d',
      },
    },
  },
  plugins: [],
}