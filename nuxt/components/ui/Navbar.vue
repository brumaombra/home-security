<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSelector from '~/components/ui/LanguageSelector.vue';
import ThemeSelector from '~/components/ui/ThemeSelector.vue';

const { t } = useI18n();
const isOpen = ref(false);

// Navigation links
const navLinks = computed(() => [
    { to: '/categories/ant-keeping-basics', label: t('navigation.antKeepingBasics') },
    { to: '/categories/care-guides', label: t('navigation.careGuides') },
    { to: '/categories/podcasts', label: t('navigation.podcasts') },
    { to: '/categories/product-reviews', label: t('navigation.productReviews') },
    { to: '/categories/tutorials', label: t('navigation.tutorials') },
    { to: '/categories/various', label: t('navigation.various') },
    { to: '/links', label: t('navigation.links') }
]);

// Toggle mobile menu
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <nav class="fixed top-0 w-full z-50 border-b bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700/70">
        <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div class="relative flex h-18 items-center justify-between">
                <!-- Mobile menu button -->
                <div class="flex items-center md:hidden">
                    <button type="button" @click="toggleMenu" class="inline-flex items-center justify-center rounded-xl w-10 h-10 text-gray-500 dark:text-gray-300 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span class="sr-only">{{ t('common.openMainMenu') }}</span>

                        <!-- Hamburger icon -->
                        <i :class="[isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars', 'text-lg transition-transform duration-300 ease-in-out', { 'rotate-180': isOpen }]" />
                    </button>
                </div>

                <!-- Logo and Desktop menu -->
                <div class="flex flex-1 items-center ms-3 md:ms-0 md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <NuxtLinkLocale to="/" class="flex items-center">
                        <NuxtImg src="/images/bruma-ants-logo.png" :alt="t('common.logoAlt')" height="44" width="44" loading="lazy" class="transform transition-all duration-300 hover:scale-105" />
                    </NuxtLinkLocale>

                    <!-- Desktop menu -->
                    <div class="hidden md:ml-8 md:flex md:items-center md:space-x-1">
                        <template v-for="link in navLinks" :key="link.to">
                            <NuxtLinkLocale :to="link.to" class="relative px-4 py-2 text-md font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-white/20" active-class="!font-bold text-bruma-green bg-gray-100/80 dark:bg-gray-100/10">
                                {{ link.label }}
                            </NuxtLinkLocale>
                        </template>
                    </div>
                </div>

                <!-- Right section -->
                <div class="flex items-center gap-3 ms-auto">
                    <!-- Theme selector -->
                    <ThemeSelector />

                    <!-- Language selector -->
                    <LanguageSelector />
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out" :class="{ 'max-h-[500px] opacity-100': isOpen, 'max-h-0 opacity-0': !isOpen }">
            <div class="px-4 pt-2 pb-3 space-y-1.5 bg-white dark:bg-gray-800">
                <template v-for="link in navLinks" :key="link.to">
                    <NuxtLinkLocale :to="link.to" @click="toggleMenu" class="block px-4 py-4 text-md font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all duration-300 hover:bg-gray-100/80 dark:hover:bg-white/20" active-class="!font-bold text-bruma-green bg-gray-100/80 dark:bg-gray-100/10">
                        {{ link.label }}
                    </NuxtLinkLocale>
                </template>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 25px;
}

.dark nav {
    box-shadow: none;
}
</style>