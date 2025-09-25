import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    ssr: true,

    runtimeConfig: {
        // Public runtime config
        public: {
            nuxtEnvironment: process.env.NUXT_ENVIRONMENT || 'development',
            videoServiceBaseUrl: process.env.VIDEO_SERVICE_BASE_URL || 'http://localhost:3001'
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

    nitro: {
        prerender: {
            routes: [
                '/',
                '/events',
                '/streams',
                '/detect'
            ]
        }
    },

    compatibilityDate: '2025-09-24'
});