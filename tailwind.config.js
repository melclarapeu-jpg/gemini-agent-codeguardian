/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#d4a938',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212,169,56,0.35), 0 8px 30px rgba(212,169,56,0.15)',
      },
    },
  },
  plugins: [],
};
