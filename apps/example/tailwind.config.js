/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        default: '#8c8c8c',
        primary: '#4d77f3',
        secondary: '#9c27b0',
        success: '#2e7d32',
        warning: '#ed6c02',
        error: '#d32f2f',
        'blue-indigo': {
          50: '#eff5ff',
          100: '#d8e9ff',
          200: '#b8d4ff',
          300: '#94b8fd',
          400: '#5f8bf7',
          500: '#4d77f3',
          600: '#3b5fe5',
          700: '#324bcc',
          800: '#2a3ba6',
          900: '#222e83',
          950: '#1c1f5b'
        }
      },
      boxShadow: {
        contained:
          'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
        'contained-hover':
          'rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('daisyui')]
};
