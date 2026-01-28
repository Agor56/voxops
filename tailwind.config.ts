import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ],
        display: [
          'Space Grotesk',
          'ui-sans-serif',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Extended teal palette for aesthetic medicine
        teal: {
          50: 'hsl(168 100% 97%)',
          100: 'hsl(168 100% 92%)',
          200: 'hsl(168 100% 82%)',
          300: 'hsl(168 100% 65%)',
          400: 'hsl(168 100% 50%)',
          500: 'hsl(168 100% 40%)',
          600: 'hsl(168 100% 33%)',
          700: 'hsl(168 100% 26%)',
          800: 'hsl(168 100% 20%)',
          900: 'hsl(168 100% 14%)',
          950: 'hsl(168 100% 8%)'
        },
        mint: {
          DEFAULT: 'hsl(160 97% 39%)',
          50: 'hsl(160 97% 97%)',
          100: 'hsl(160 97% 92%)',
          200: 'hsl(160 97% 82%)',
          300: 'hsl(160 97% 68%)',
          400: 'hsl(160 97% 52%)',
          500: 'hsl(160 97% 45%)',
          600: 'hsl(160 97% 39%)',
          700: 'hsl(160 97% 32%)',
          800: 'hsl(160 97% 25%)',
          900: 'hsl(160 97% 18%)'
        },
        baltic: {
          DEFAULT: 'hsl(197 97% 29%)',
          500: 'hsl(197 97% 29%)',
          600: 'hsl(197 97% 24%)',
          700: 'hsl(197 97% 19%)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.4s ease-out forwards',
        'gradient-shift': 'gradient-shift 3s ease infinite'
      },
      boxShadow: {
        '2xs': 'var(--shadow-2xs)',
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        'teal-glow': '0 0 60px hsl(168 100% 40% / 0.3)',
        'mint-glow': '0 0 60px hsl(160 97% 45% / 0.25)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;