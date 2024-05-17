// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: false},
  modules: [
    '@pinia/nuxt',
    "vue3-carousel-nuxt",
    "@nuxtjs/tailwindcss",
    'nuxt3-notifications',
    '@vueuse/nuxt'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "~/assets/main.sass" as *\n'
        }
      }
    }
  },
  app: {
    pageTransition: {name: 'page', mode: 'out-in'}
  },
})
