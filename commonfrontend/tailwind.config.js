/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/src/images/loginPhoto.png')",
        'navbar-pattern': "url('/src/images/navbarPhoto.png')",
      }
    },
  },
  plugins: [],
}
