// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
        },
    },
    devtools: { enabled: true },
    modules: ["@pinia/nuxt"],
    pinia: {
        storesDirs: ["app/stores/**"],
    },
});
