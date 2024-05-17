// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  modules: [
    '@pinia/nuxt',
    "vue3-carousel-nuxt"
  ],
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },
})
