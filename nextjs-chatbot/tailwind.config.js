/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#F75F0B',
          600: '#E0540A',
        },
        teal: {
          500: '#2FA0B5',
          600: '#1a9bb0',
        }
      },
    },
  },
  plugins: [],
}
