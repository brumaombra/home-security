<script setup>
// Props
const props = defineProps({
    icon: { type: String, default: 'fas fa-inbox' },
    title: { type: String, default: 'No items found' },
    description: { type: String, default: '' }
});
</script>

<template>
    <div class="text-center py-12">
        <div class="text-6xl text-gray-300 mb-4">
            <i :class="icon"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">{{ title }}</h3>
        <p v-if="description" class="text-gray-500">{{ description }}</p>
    </div>
</template>