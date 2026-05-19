/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Toggle dark mode by adding/removing class on <html>
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Crimson Text', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        /** Light theme neutrals — slightly cool gray with room for warm red accents */
        page: '#e5e7ef',
        'page-soft': '#eef0f6',
        parchment: '#e5e7ef',
        ink: '#0d0d0d',
        brandred: '#b9141e',
      },
    },
  },
  plugins: [],
};
