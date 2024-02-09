/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

/** @type {import('tailwindcss').Config} */

module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      fontFamily: {
        'sans': ['var(--font-alliance)']
      },
      colors: {
        brown: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b'
        }
      }
    }
  }
}
