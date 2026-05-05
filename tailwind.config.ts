import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  // ── Dark mode via classe sur <html> ──────────────────────────────────────────
  // Le hook useDarkMode ajoute/retire la classe 'dark' sur document.documentElement
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B35',
          'orange-light': '#FF8C5A',
          'orange-dark': '#E5501A',
        },
        surface: {
          DEFAULT: '#FAFAF8',
          dark: '#141412', // fond dark mode (plus sombre que l'original)
          card: '#FFFFFF',
          'card-dark': '#1E1E1C',
        },
        ink: {
          DEFAULT: '#1A1A18',
          muted: '#6B6B60',
          subtle: '#A8A89A',
          // tokens dark mode pour le texte
          dark: '#E8E8E2', // texte principal en dark
          'dark-muted': '#9B9B8E',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        marquee: 'marquee 25s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        blob: 'blob 7s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config
