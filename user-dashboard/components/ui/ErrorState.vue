<script setup>
// Props
const props = defineProps({
    title: { type: String, default: 'Error' },
    message: { type: String, default: 'Something went wrong' },
    icon: { type: String, default: 'fas fa-exclamation-triangle' }
});
</script>

<template>
    <div class="text-center py-12">
        <div class="text-6xl text-red-300 mb-4">
            <i :class="icon"></i>
        </div>
        <h3 class="text-xl font-bold text-red-600 mb-2">{{ title }}</h3>
        <p class="text-red-600">{{ message }}</p>
    </div>
</template>