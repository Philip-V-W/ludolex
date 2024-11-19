import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Base backgrounds
        'bg-dark': '#171A21',
        'bg-nav': '#0F1115',

        // UI Elements
        icon: {
          light: '#FFFFFF',
          dark: '#1E222B',
        },

        // Ratings
        rating: {
          success: '#139862',
          warning: '#996B13',
          error: '#86131C',
        },

        // Additional UI colors
        accent: {
          primary: '#1B2838',
          secondary: '#2A475E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#8F98A0',
          muted: '#66727F',
        },
        'custom-border': {
          light: '#2D3544',
          dark: '#1A1D23',
        },

        // shadcn required tokens
        input: '#2D3544',
        ring: '#2D3544',
        background: '#171A21',
        foreground: '#FFFFFF',

        primary: {
          DEFAULT: '#1B2838',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2A475E',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#86131C',
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#1E222B',
          foreground: '#8F98A0',
        },
        popover: {
          DEFAULT: '#171A21',
          foreground: '#FFFFFF',
        },
        card: {
          DEFAULT: '#1B2838',
          foreground: '#FFFFFF',
        },
      },
      borderColor: {
        DEFAULT: '#2D3544',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [animate],
} satisfies Config

export default config
