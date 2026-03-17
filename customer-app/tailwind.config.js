/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#151313',
        pink: { 50: '#FFF0F7', 100: '#FFE0EF', 200: '#FFB8D9', 400: '#FF6DB8', 500: '#FF34A4', 600: '#E6208E' },
        yellow: { 50: '#FFFDE6', 100: '#FFF9B3', 200: '#FFF380', 400: '#F5E44A', 500: '#F0DB3B', 600: '#D4C030' },
      },
    },
  },
  plugins: [],
};
