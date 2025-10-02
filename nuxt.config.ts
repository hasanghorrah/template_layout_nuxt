// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  runtimeConfig: {
    public: {
      apiBase: 'https://card.hi-jawwad.com/api/api'
    }
  },
  tailwindcss: {
    viewer: false
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'ar',
    lazy: true,
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'nuxt-language',
      cookieSecure: false,
      cookieCrossOrigin: false,
      cookieDomain: null,
      fallbackLocale: 'ar'
    },
    locales: [
      { code: 'ar', name: 'العربية', dir: 'rtl', file: 'ar.json' },
      { code: 'en', name: 'English', dir: 'ltr', file: 'en.json' }
    ],
    vueI18n: './i18n.config.ts'
  }
})
