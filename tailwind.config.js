/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "!./node_modules/**/*"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '0px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px'
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      colors: {
        primary: '#1D242D'


      }
    },
  },
  plugins: [],
}