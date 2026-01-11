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
  css: [
    '~/css/styles.scss',
  ],
  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en-US', file: 'en-US.json' },
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
