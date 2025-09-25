<script setup>
// Props
const props = defineProps({
    text: { type: String, default: 'Loading...' },
    size: { type: String, default: 'md', validator: value => ['sm', 'md', 'lg'].includes(value) }
});

// Spinner size classes
const spinnerSize = computed(() => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };
    return sizes[props.size] || sizes.md;
});
</script>

<template>
    <div class="text-center py-12">
        <div class="inline-block">
            <div :class="['border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4', spinnerSize]"></div>
        </div>
        <div class="text-xl text-gray-500">{{ text }}</div>
    </div>
</template>