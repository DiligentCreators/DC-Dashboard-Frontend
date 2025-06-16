// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxt/ui", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  plugins: [
    { src: '~/plugins/vue3-quill.js', mode: 'client' }
  ],
  ui: {
    colorMode: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
});
