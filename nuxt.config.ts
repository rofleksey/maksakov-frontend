// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  modules: [
    '@pinia/nuxt',
    "vue3-carousel-nuxt",
    "@nuxtjs/tailwindcss",
    'nuxt3-notifications',
    '@vueuse/nuxt',
    "nuxt-lodash",
    "@nuxtjs/sitemap"
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
  sitemap: {
    excludeAppSources: true,
    sources: ['/api/__sitemap__/urls']
  }
})
