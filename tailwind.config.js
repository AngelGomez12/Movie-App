/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg-movie': "url('./img/peliculas.jpg')"
      }
    },
  },
  plugins: [],
}
