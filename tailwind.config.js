/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#023942',
          orange: '#F75F0B',
          ice: '#CFF8FF',
          black: '#000000',
          white: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#111111',
          raised: '#131313',
          border: '#2F4A50',
        },
      },
    },
  },
  plugins: [],
};
