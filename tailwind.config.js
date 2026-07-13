/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF6E8',
          100: '#F5EBCC',
          200: '#EBD699',
          300: '#DFC066',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#A8861F',
          700: '#876A19',
          800: '#664F13',
          900: '#45350D',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#1A1A1A',
          soft: '#2A2A2A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        luxury: '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
        'luxury-lg': '0 32px 64px -16px rgba(0, 0, 0, 0.18)',
        gold: '0 0 40px rgba(201, 162, 39, 0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
