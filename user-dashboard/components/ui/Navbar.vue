<script setup>
import { ref, computed } from 'vue';

const isOpen = ref(false);

// Navigation links
const navLinks = computed(() => [
    { to: '/events', label: 'Events' },
    { to: '/streams', label: 'Streams' },
    { to: '/detect', label: 'Detect' }
]);

// Toggle mobile menu
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>

<template>
    <nav class="fixed top-0 w-full z-50 border-b bg-white border-gray-100">
        <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <div class="relative flex h-18 items-center justify-between">
                <!-- Mobile menu button -->
                <div class="flex items-center md:hidden">
                    <button type="button" @click="toggleMenu" class="inline-flex items-center justify-center rounded-xl w-10 h-10 text-gray-500 transition-all duration-300 hover:bg-gray-100">
                        <span class="sr-only">Open main menu</span>

                        <!-- Hamburger icon -->
                        <i :class="[isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars', 'text-lg transition-transform duration-300 ease-in-out', { 'rotate-180': isOpen }]" />
                    </button>
                </div>

                <!-- Logo and Desktop menu -->
                <div class="flex flex-1 items-center ms-3 md:ms-0 md:items-stretch md:justify-start">
                    <!-- Logo -->
                    <NuxtLink to="/" class="flex items-center">
                        <i class="fas fa-shield-alt text-3xl text-blue-600 transform transition-all duration-300 hover:scale-105" />
                    </NuxtLink>

                    <!-- Desktop menu -->
                    <div class="hidden md:ml-8 md:flex md:items-center md:space-x-1">
                        <template v-for="link in navLinks" :key="link.to">
                            <NuxtLink :to="link.to" class="relative px-4 py-2 text-md font-medium text-gray-700 hover:text-primary-600 rounded-xl transition-all duration-300 hover:bg-gray-100/80" active-class="!font-bold !text-blue-600 bg-gray-100/80">
                                {{ link.label }}
                            </NuxtLink>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu -->
        <div class="md:hidden overflow-hidden transition-all duration-300 ease-in-out" :class="{ 'max-h-[500px] opacity-100': isOpen, 'max-h-0 opacity-0': !isOpen }">
            <div class="px-4 pt-2 pb-3 space-y-1.5 bg-white">
                <template v-for="link in navLinks" :key="link.to">
                    <NuxtLink :to="link.to" @click="toggleMenu" class="block px-4 py-4 text-md font-medium text-gray-700 hover:text-primary-600 rounded-xl transition-all duration-300 hover:bg-gray-100/80" active-class="!font-bold !text-blue-600 bg-gray-100/80">
                        {{ link.label }}
                    </NuxtLink>
                </template>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    box-shadow: rgba(149, 157, 165, 0.15) 0px 8px 25px;
}
</style>