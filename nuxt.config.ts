// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@primevue/nuxt-module',
  ],
  eslint: {
    config: {
      standalone: false,
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US' },
      // { code: 'fr', language: 'fr-FR' }
    ],
    defaultLocale: 'en',
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    },
  },
})
