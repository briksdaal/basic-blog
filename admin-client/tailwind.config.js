/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        mantis: {
          50: '#f5faf3',
          100: '#e8f5e3',
          200: '#d1eac8',
          300: '#acd89d',
          400: '#7dbc69',
          500: '#5ba146',
          600: '#498336',
          700: '#3b682d',
          800: '#325328',
          900: '#294522',
          950: '#12250e'
        }
      }
    }
  },
  plugins: []
};
