module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"] ,
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#ffffff',
        accent: '#6366F1',
        accentRed: '#E11D48',
        bg: {
          DEFAULT: '#FFFFFF',
          light: '#F8FAFC',
          faint: '#F8FAFC'
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#475569'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(16,24,40,0.08)',
        'elevate': '0 12px 40px rgba(2,6,23,0.12)',
        'lux': '0 20px 60px rgba(15,23,42,0.16)'
      },
      borderRadius: {
        'lg-2': '12px'
      },
      letterSpacing: {
        tightest: '-0.03em'
      }
    }
  },
  plugins: []
}
