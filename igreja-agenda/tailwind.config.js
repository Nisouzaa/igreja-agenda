/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        serenity: {
          50:  '#E8F2F9',
          100: '#C6DFEE',
          200: '#9DCADF',
          400: '#7BA7C4',
          600: '#5A8FAF',
          800: '#2E5E7A',
          900: '#1A3D52',
        },
        gold: {
          50:  '#FDF6E3',
          100: '#F7E8BF',
          200: '#EDD08A',
          400: '#C9A84C',
          600: '#A07C28',
          800: '#6B5010',
        },
        sage: {
          50:  '#EBF5F0',
          100: '#C8E8D8',
          200: '#9DD4B8',
          400: '#6BAA8B',
          600: '#3A7A5E',
          800: '#1E4E3A',
        },
        cream: {
          50:  '#FDFCF9',
          100: '#F7F4EF',
          200: '#EDE8DF',
          400: '#D4CCBF',
          600: '#A89E90',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft:   '0 2px 12px rgba(0,0,0,0.06)',
        medium: '0 4px 24px rgba(0,0,0,0.10)',
      },
      animation: {
        'fade-in':  'fadeIn 0.35s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                              to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
