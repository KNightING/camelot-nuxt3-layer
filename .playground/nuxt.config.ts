export default defineNuxtConfig({
  extends: ['..'],

  runtimeConfig: {
    securityPlugin: {
      enabled: false,
    },
    tappay: {
      addScript: false,
    },
    googlePay: {
      addScript: false,
    },
  },

  compatibilityDate: '2024-11-16',
})
