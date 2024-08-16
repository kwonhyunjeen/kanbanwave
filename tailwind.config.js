/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#8c8c8c',
        primary: '#1976d2',
        secondary: '#9c27b0',
        success: '#2e7d32',
        warning: '#ed6c02',
        error: '#d32f2f'
      },
      boxShadow: {
        'contained':
          'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
        'contained-hover':
          'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
      }
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
};
