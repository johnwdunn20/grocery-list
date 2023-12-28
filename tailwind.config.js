/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#FAFAFA',
        'secondaryBackgroud': '#F5F5F5',
        'primaryBlue': '#1565C0',
        'secondaryBlue': '#4FC3F7',
        'tertiaryBlue': '#B3E5FC',
        'accentColor': '#FF6B6B',
        'primaryTextColor': '#263238',
        'secondaryTextColor': '#757575',
        'primaryButtonHoverColor': 'rgb(3, 118, 249)',
        'secondaryButtonHoverColor': '#39b7f1',
      },
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
}