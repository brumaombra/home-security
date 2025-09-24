<script setup>
// Props
const props = defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    icon: { type: String, default: '' }
});
</script>

<template>
    <div class="text-center mb-12">
        <!-- Icon -->
        <div v-if="icon" class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm mb-4">
            <i :class="icon" class="text-xl text-white"></i>
        </div>

        <!-- Title -->
        <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {{ title }}
        </h1>

        <!-- Subtitle -->
        <p v-if="subtitle" class="text-lg text-gray-600 max-w-xl mx-auto">
            {{ subtitle }}
        </p>
    </div>
</template>