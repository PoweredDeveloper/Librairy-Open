/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-alliance)']
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#f2f2f2',
      accent: {
        50: '#ffe8e8',
        400: '#ef3054',
        500: '#bc2542'
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712'
      }
    },
    plugins: []
  }
}
