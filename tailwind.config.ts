import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import('tailwindcss-animate')

// Fluid typography plugin
const fluidType = plugin(({ matchUtilities, theme }) => {
  matchUtilities(
    {
      'fluid': (value) => {
        const [min, max] = value.split('_').map(Number) as [number, number]
        return {
          fontSize: `clamp(${min}rem, ${(min + (max - min) * 0.5)}vw, ${max}rem)`
        }
      }
    },
    {
      values: {
        'max-12': '0.375_0.75',    // Scales from 10px to 12px genre__text
        'max-14': '0.4375_0.875',    // Scales from 12px to 14px rating__bubble__text
        'max-16': '0.5_1',       // Scales from 14px to 16px sidebar__text
        'max-18': '0.5625_1.125',    // Scales from 16px to 18px sidebar__text__bold
        'max-20': '0.625_1.25',        // Scales from 16px to 20px sidebar__semibold__text
        'max-26': '0.8125_1.625',    // Scales from 20px to 26px sidebar__bold__text
        'max-32': '1_2',        // Scales from 24px to 32px title__text
        'max-48': '1.5_3',       // Scales from 30px to 48px title__text__bold
      }
    }
  )
})

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
    screens: {
      '2xs': '375px',   // Small mobile
      'xs': '475px',    // Mobile
      'sm': '640px',    // Large mobile/Small tablet
      'md': '768px',    // Tablet
      'lg': '1024px',   // Small laptop
      'xl': '1280px',   // Desktop
      '2xl': '1536px',  // Large desktop
      '3xl': '1800px',  // Extra large desktop
      '4xl': '1920px',  // Maximum width
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xs': '375px',
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1800px',
        '4xl': '1920px',
      },
    },
    extend: {
      maxWidth: {
        '2xs': '375px',
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1800px',
        '4xl': '1920px',
      },
      letterSpacing: {
        '1.24': '1.24px',
      },
      spacing: {
        '4.5': '1.125rem',
        18: '4.5rem',
        112: '28rem',
        128: '32rem',
      },
      colors: {
        'bg-dark': '#171A21',
        'bg-nav': '#0F1115',
        'bg-white': '#FFFFFF',
        icon: {
          light: '#FFFFFF',
          dark: '#1E222B',
        },
        rating: {
          success: '#139862',
          warning: '#996B13',
          error: '#86131C',
        },
        accent: {
          primary: '#1B2838',
          secondary: '#2A475E',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#8F98A0',
          muted: '#66727F',
          dark: '#0F1115',
        },
        'custom-border': {
          light: '#2D3544',
          dark: '#1A1D23',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderColor: {
        DEFAULT: '#2D3544',
      },
      borderRadius: {
        '7xl': '96px',
        '6xl': '64px',
        '5xl': '48px',
        '4xl': '32px',
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
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
    fluidType,
  ],
} satisfies Config

export default config