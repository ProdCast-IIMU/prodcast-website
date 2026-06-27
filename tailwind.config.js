/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Core Brand (Dark Shell) ──────────────────────────
        'deep':    '#060C18',   // Hero, absolute darkest
        'navy':    '#0A1628',   // Main bg — matches logo background
        'navy-card': '#0D1E35', // Card surfaces
        'navy-hi': '#132540',   // Hover / elevated cards

        // ── Accent System ────────────────────────────────────
        'sky':     '#4DBAFF',   // Primary accent — electric blue (elevated logo blue)
        'sky-soft':'#4DA8DA',   // Softer sky — secondary text accents
        'teal':    '#00E5C8',   // CTA / highlights — electric teal
        'teal-dim':'#00B8A3',   // Muted teal

        // ── Text ─────────────────────────────────────────────
        'ice':     '#F0F8FF',   // Primary text on dark
        'ice-dim': '#B8D4EC',   // Secondary text on dark
        'muted':   '#6B8FAB',   // Muted / captions

        // ── Light Surface (Knowledge Hub / Articles) ─────────
        'ivory':   '#F5F2ED',   // Light page bg
        'ivory-hi':'#EDE9E2',   // Light card bg
        'ink':     '#0A1628',   // Dark text on light = navy
        'ink-dim': '#2D4A6B',   // Muted text on light

        // ── Semantic (used in Tailwind utilities) ─────────────
        background: '#060C18',
        foreground: '#F0F8FF',
        border:     'rgba(77,186,255,0.14)',
        primary:    '#4DBAFF',
        'primary-foreground': '#060C18',
        'muted-foreground': '#6B8FAB',
        surface:    '#F5F2ED',
        'surface-foreground': '#0A1628',
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },

      backgroundImage: {
        'hero-radial':  'radial-gradient(ellipse 90% 50% at 50% -10%, rgba(77,186,255,0.16) 0%, transparent 65%)',
        'card-shine':   'linear-gradient(135deg, rgba(77,186,255,0.06) 0%, transparent 60%)',
        'teal-glow':    'radial-gradient(circle, rgba(0,229,200,0.2) 0%, transparent 65%)',
        'sky-glow':     'radial-gradient(circle, rgba(77,186,255,0.25) 0%, transparent 65%)',
        'section-fade': 'linear-gradient(to bottom, transparent, #060C18)',
      },

      animation: {
        'spin-slow':    'spin 30s linear infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        'pulse-glow':   'pulse-glow 3s ease-in-out infinite',
        'twinkle':      'twinkle 2.5s ease-in-out infinite',
        'float':        'float 7s ease-in-out infinite',
        'count-up':     'fade-in 0.5s ease-out',
      },

      keyframes: {
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        'pulse-glow': {
          '0%,100%': { boxShadow: '0 0 20px rgba(77,186,255,0.2), 0 0 60px rgba(77,186,255,0.05)' },
          '50%':     { boxShadow: '0 0 40px rgba(77,186,255,0.5), 0 0 100px rgba(77,186,255,0.15)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%':     { opacity: '1',   transform: 'scale(1.2)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
      },

      boxShadow: {
        'sky-sm':  '0 0 20px rgba(77,186,255,0.15)',
        'sky-md':  '0 0 40px rgba(77,186,255,0.25)',
        'sky-lg':  '0 0 80px rgba(77,186,255,0.3)',
        'teal-sm': '0 0 20px rgba(0,229,200,0.15)',
        'teal-md': '0 0 40px rgba(0,229,200,0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
