import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0C0E16',
        purple: '#7C5DFA',
        red: '#EC5757',
        gray: '#888EB0',
        grayish: '#858BB2',
        'light-gray': '#DFE3FA',
        'light-purple': '#9277FF',
        'grayish-blue': '#373B53',
        'dark-grayish-blue': '#1E2139',
        'very-dark-blue': '#141625',
        'grayish-white': '#F8F8FB'
      }
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      openRight: {
        '0%': { 'clip-path': 'inset(0 100% 0 0)' },
        '50%': { 'clip-path': 'inset(0 100% 0 0)' },
        '100%': { 'clip-path': 'inset(0 0 0 0)' }
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out',
      'open-right': 'openRight 0.6s ease-in-out'
    },
    boxShadow: {
      card: '0px 10px 10px -10px rgba(72, 84, 159, 0.10)',
      'card-reverse': '0px -10px 10px -10px rgba(72, 84, 159, 0.10)'
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
}

export default config
