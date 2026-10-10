/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lacivert: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d9fe',
          300: '#a3c0fd',
          400: '#739dfb',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f172a',
          950: '#090e1a'
        },
        brass: {
          50: '#fbf8ee',
          100: '#f4ebd2',
          500: '#c69a39',
          600: '#a87c24',
          700: '#865f1c'
        }
      }
    }
  },
  plugins: []
};
