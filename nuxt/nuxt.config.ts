import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    ssr: true,

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss()
        ]
    },

    modules: [
        // Nuxt modules
    ],

    devtools: {
        enabled: false
    },

    nitro: {
        prerender: {
            routes: [
                '/',
                '/events',
                '/streams'
            ]
        }
    },

    compatibilityDate: '2025-09-24'
});