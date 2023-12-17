/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      spacing: {
        "header":"3rem",
        "footer":"30px"
      },
      colors: {
        "primary": "var(--material3-primary)",
        "primary-container": "var(--material3-primary-container)",
        "on-primary": "var(--material3-on-primary)",
        "on-primary-container": "var(--material3-on-primary-container)",
        "inverse-primary": "var(--material3-inverse-primary)",
        "secondary": "var(--material3-secondary)",
        "secondary-container": "var(--material3-secondary-container)",
        "on-secondary": "var(--material3-on-secondary)",
        "on-secondary-container": "var(--material3-on-secondary-container)",
        "tertiary": "var(--material3-tertiary)",
        "tertiary-container": "var(--material3-tertiary-container)",
        "on-tertiary": "var(--material3-on-tertiary)",
        "on-tertiary-container": "var(--material3-on-tertiary-container)",
        "surface": "var(--material3-surface)",
        "surface-dim": "var(--material3-surface-dim)",
        "surface-bright": "var(--material3-surface-bright)",
        "surface-container-lowest": "var(--material3-surface-container-lowest)",
        "surface-container-low": "var(--material3-surface-container-low)",
        "surface-container": "var(--material3-surface-container)",
        "surface-container-high": "var(--material3-surface-container-high)",
        "surface-container-highest": "var(--material3-surface-container-highest)",
        "surface-variant": "var(--material3-surface-variant)",
        "on-surface": "var(--material3-on-surface)",
        "on-surface-variant": "var(--material3-on-surface-variant)",
        "inverse-surface": "var(--material3-inverse-surface)",
        "inverse-on-surface": "var(--material3-inverse-on-surface)",
        "background": "var(--material3-background)",
        "on-background": "var(--material3-on-background)",
        "error": "var(--material3-error)",
        "error-container": "var(--material3-error-container)",
        "on-error": "var(--material3-on-error)",
        "on-error-container": "var(--material3-on-error-container)",
        "outline": "var(--material3-outline)",
        "outline-variant": "var(--material3-outline-variant)",
        "shadow": "var(--material3-shadow)",
        "surface-tint": "var(--material3-surface-tint)",
        "scrim": "var(--material3-scrim)",
      },
      transitionTimingFunction: {
        'overshoot':'cubic-bezier(0.2, 0.4, 0.8, 1.3)'
      }
    },
  },
  plugins: [],
};
