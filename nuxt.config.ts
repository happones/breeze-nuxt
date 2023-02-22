// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/app.css'],
    runtimeConfig: {
        public: {
            backendUrl: process.env.NUXT_PUBLIC_BACKEND_URL,
        }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
