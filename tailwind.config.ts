import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fbf9',
          100: '#ccf4ec',
          200: '#9fe6dc',
          300: '#6dd5c8',
          400: '#44bdaa',
          500: '#259f8b',
          600: '#1d8071',
          700: '#18665b',
          800: '#134f46',
          900: '#103f38'
        },
        surface: {
          light: '#f5f6f8',
          DEFAULT: '#1e2a2a',
          dark: '#111a1a'
        },
        accent: {
          100: '#fdf4d7',
          200: '#fbdc86',
          300: '#f9c64a',
          400: '#eba51d'
        }
      },
      boxShadow: {
        soft: '0 20px 45px -15px rgba(15, 23, 42, 0.35)',
        card: '0 18px 35px -18px rgba(14, 116, 144, 0.45)'
      },
      fontFamily: {
        sans: ['"Tajawal"', '"Segoe UI"', 'Tahoma', 'sans-serif']
      },
      backgroundImage: {
        'hero-overlay': 'linear-gradient(135deg, rgba(37, 159, 139, 0.9), rgba(14, 116, 144, 0.65))'
      }
    }
  }
}