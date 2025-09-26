import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    ssr: false,

    runtimeConfig: {
        // Public runtime config
        public: {
            nuxtEnvironment: process.env.NUXT_ENVIRONMENT || 'development',
            videoServiceUrl: process.env.VIDEO_SERVICE_URL || 'http://localhost',
            videoServicePort: process.env.VIDEO_SERVICE_PORT || '3001'
        }
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'en'
            }
        }
    },

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

    compatibilityDate: '2025-09-24'
});