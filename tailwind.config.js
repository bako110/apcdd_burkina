/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eefbf0',
          100: '#d5f5db',
          200: '#aeeabb',
          300: '#7cd991',
          400: '#4cc16c',
          500: '#28a745',
          600: '#1f8a38',
          700: '#1c6d30',
          800: '#1a562a',
          900: '#164726',
          950: '#082712',
        },
        accent: {
          50: '#fffbea',
          100: '#fff3c4',
          200: '#ffe58a',
          300: '#ffd44f',
          400: '#ffc107',
          500: '#e6a800',
          600: '#c78700',
          700: '#9c6600',
          800: '#7f5209',
          900: '#6b440e',
          950: '#3d2404',
        },
        neutral: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#eef0f2',
          200: '#dde1e6',
          300: '#c2c8d0',
          400: '#9aa2ac',
          500: '#707882',
          600: '#545b64',
          700: '#3d434b',
          800: '#26292e',
          900: '#171a1d',
          950: '#0c0e10',
        },
        danger: {
          50: '#fdecec',
          500: '#dc3545',
          600: '#b8222f',
        },
        info: {
          50: '#e7f7fa',
          500: '#17a2b8',
          600: '#127e90',
        },
      },
      boxShadow: {
        elevated: '0 20px 40px -12px rgba(23, 26, 29, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out both',
        'slide-up': 'slideUp 0.6s ease-out both',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
