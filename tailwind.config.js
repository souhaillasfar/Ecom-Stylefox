/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",
    "!./node_modules/**/*"
  ],
  theme: {
    extend: {
      fontFamily:{
        poppins: ["Poppins", "serif"]
      }
    },
  },
  plugins: [],
}

