export default defineNuxtConfig({
  extends: ['..'],

  runtimeConfig: {
    tappay: {
      addScript: false,
    },
    googlePay: {
      addScript: false,
    },
  },

  compatibilityDate: '2024-11-16',
})
