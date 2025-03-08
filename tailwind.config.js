/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      backgroundImage: {
        radial: 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
      spacing: {
        header: '3rem',
        footer: '30px',
      },
      colors: {
        'primary': 'rgba(var(--camelot-m3-primary), <alpha-value>)',
        'primary-container': 'rgba(var(--camelot-m3-primary-container), <alpha-value>)',
        'on-primary': 'rgba(var(--camelot-m3-on-primary), <alpha-value>)',
        'on-primary-container': 'rgba(var(--camelot-m3-on-primary-container), <alpha-value>)',

        'primary-fixed': 'rgba(var(--camelot-m3-primary-fixed), <alpha-value>)',
        'primary-fixed-dim': 'rgba(var(--camelot-m3-primary-fixed-dim), <alpha-value>)',
        'on-primary-fixed': 'rgba(var(--camelot-m3-on-primary-fixed), <alpha-value>)',
        'on-primary-fixed-variant': 'rgba(var(--camelot-m3-on-primary-fixed-variant), <alpha-value>)',

        'secondary': 'rgba(var(--camelot-m3-secondary), <alpha-value>)',
        'secondary-container': 'rgba(var(--camelot-m3-secondary-container), <alpha-value>)',
        'on-secondary': 'rgba(var(--camelot-m3-on-secondary), <alpha-value>)',
        'on-secondary-container': 'rgba(var(--camelot-m3-on-secondary-container), <alpha-value>)',

        'secondary-fixed': 'rgba(var(--camelot-m3-secondary-fixed), <alpha-value>)',
        'secondary-fixed-dim': 'rgba(var(--camelot-m3-secondary-fixed-dim), <alpha-value>)',
        'on-secondary-fixed': 'rgba(var(--camelot-m3-on-secondary-fixed), <alpha-value>)',
        'on-secondary-fixed-variant': 'rgba(var(--camelot-m3-on-secondary-fixed-variant), <alpha-value>)',

        'tertiary': 'rgba(var(--camelot-m3-tertiary), <alpha-value>)',
        'tertiary-container': 'rgba(var(--camelot-m3-tertiary-container), <alpha-value>)',
        'on-tertiary': 'rgba(var(--camelot-m3-on-tertiary), <alpha-value>)',
        'on-tertiary-container': 'rgba(var(--camelot-m3-on-tertiary-container), <alpha-value>)',

        'tertiary-fixed': 'rgba(var(--camelot-m3-tertiary-fixed), <alpha-value>)',
        'tertiary-fixed-dim': 'rgba(var(--camelot-m3-tertiary-fixed-dim), <alpha-value>)',
        'on-tertiary-fixed': 'rgba(var(--camelot-m3-on-tertiary-fixed), <alpha-value>)',
        'on-tertiary-fixed-variant': 'rgba(var(--camelot-m3-on-tertiary-fixed-variant), <alpha-value>)',

        'surface-dim': 'rgba(var(--camelot-m3-surface-dim), <alpha-value>)',
        'surface': 'rgba(var(--camelot-m3-surface), <alpha-value>)',
        'surface-bright': 'rgba(var(--camelot-m3-surface-bright), <alpha-value>)',

        'surface-container-lowest': 'rgba(var(--camelot-m3-surface-container-lowest), <alpha-value>)',
        'surface-container-low': 'rgba(var(--camelot-m3-surface-container-low), <alpha-value>)',
        'surface-container': 'rgba(var(--camelot-m3-surface-container), <alpha-value>)',
        'surface-container-high': 'rgba(var(--camelot-m3-surface-container-high), <alpha-value>)',
        'surface-container-highest': 'rgba(var(--camelot-m3-surface-container-highest), <alpha-value>)',

        'on-surface': 'rgba(var(--camelot-m3-on-surface), <alpha-value>)',
        'on-surface-variant': 'rgba(var(--camelot-m3-on-surface-variant), <alpha-value>)',
        'outline': 'rgba(var(--camelot-m3-outline), <alpha-value>)',
        'outline-variant': 'rgba(var(--camelot-m3-outline-variant), <alpha-value>)',

        'error': 'rgba(var(--camelot-m3-error), <alpha-value>)',
        'error-container': 'rgba(var(--camelot-m3-error-container), <alpha-value>)',
        'on-error': 'rgba(var(--camelot-m3-on-error), <alpha-value>)',
        'on-error-container': 'rgba(var(--camelot-m3-on-error-container), <alpha-value>)',

        'inverse-surface': 'rgba(var(--camelot-m3-inverse-surface), <alpha-value>)',
        'inverse-on-surface': 'rgba(var(--camelot-m3-inverse-on-surface), <alpha-value>)',
        'inverse-primary': 'rgba(var(--camelot-m3-inverse-primary), <alpha-value>)',

        'scrim': 'rgba(var(--camelot-m3-scrim), <alpha-value>)',
        'shadow': 'rgba(var(--camelot-m3-shadow), <alpha-value>)',

        'test': 'rgba(var(--camelot-c-test), <alpha-value>)',
      },
      transitionTimingFunction: {
        overshoot: 'cubic-bezier(0.2, 0.4, 0.8, 1.3)',
      },
    },
  },
  plugins: [],
}
