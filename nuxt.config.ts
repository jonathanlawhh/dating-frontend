// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ],
      htmlAttrs: {
        lang: 'en'
      },
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
})
