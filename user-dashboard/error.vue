<script setup>
import Card from '~/components/ui/Card.vue';
import Button from '~/components/ui/Button.vue';
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center p-4 sm:p-8 bg-gray-50">
        <Card class="max-w-lg mx-auto text-center">
            <!-- Error Icon -->
            <div class="mb-6">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                    <i class="fas fa-exclamation-triangle text-3xl text-white"></i>
                </div>
            </div>

            <!-- Error Code -->
            <div class="mb-4">
                <span class="text-6xl font-bold text-gray-800">404</span>
            </div>

            <!-- Title -->
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Page Not Found
            </h1>

            <!-- Message -->
            <p class="text-gray-600 mb-8 leading-relaxed">
                Sorry, the page you are looking for does not exist.
            </p>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <NuxtLink to="/">
                    <Button text="Go Home" icon="fas fa-home" type="primary" />
                </NuxtLink>
            </div>
        </Card>
    </div>
</template>