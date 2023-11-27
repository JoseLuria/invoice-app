import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#0C0E16',
        purple: '#7C5DFA',
        gray: '#888EB0',
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
      }
    },
    animation: {
      'fade-in': 'fadeIn 0.3s ease-in-out'
    }
  },
  plugins: []
}

export default config
