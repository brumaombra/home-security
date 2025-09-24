<script setup>
import Navbar from '~/components/ui/Navbar.vue';
</script>

<template>
    <div class="flex flex-col min-h-screen bg-gray-50">
        <!-- Navbar -->
        <Navbar />

        <!-- Main Content -->
        <div class="flex-1 mt-18">
            <div class="mx-auto max-w-7xl py-8 px-3 md:py-12 md:px-5">
                <NuxtPage />
            </div>

            <!-- Footer -->
            <!-- <Footer /> -->
        </div>
    </div>
</template>