/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '5xl': '2.75rem',
        '6xl': '3.25rem'
      },
      width: {
        'nav-drawer': '250px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
};
