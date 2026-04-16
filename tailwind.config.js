/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'luxury-black':   '#111111',
        'luxury-white':   '#F9F9F7',
        'champagne':      '#C5A059',
        'champagne-light':'#D4B575',
        'champagne-dark': '#A08040',
        'charcoal':       '#1A1A1A',
        'mist':           '#E8E6E0',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Montserrat"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury:  '0.15em',
        ultra:   '0.25em',
        widest2: '0.35em',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '12rem',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
      transitionDuration: {
        '700': '700ms',
        '900': '900ms',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up':    'fadeUp 1.2s ease forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow':  'spin 12s linear infinite',
        'line-grow':  'lineGrow 1.8s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineGrow: {
          '0%':   { height: '0px', opacity: '0' },
          '100%': { height: '80px', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
