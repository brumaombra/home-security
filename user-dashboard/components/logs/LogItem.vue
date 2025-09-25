<script setup>
// Props
const props = defineProps({
    log: { type: Object, default: null }
});

// Format timestamp
const formattedTimestamp = computed(() => {
    const date = new Date(props.log.timestamp);
    return date.toLocaleString();
});

// Type color
const typeColor = computed(() => {
    return props.log.type === 'error' ? 'text-red-600' : 'text-blue-600';
});
</script>

<template>
    <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-6">
        <!-- Log details -->
        <div class="flex flex-col flex-1">
            <div class="font-bold text-gray-900 text-lg capitalize" :class="typeColor">{{ log.type }}</div>
            <div class="text-sm text-gray-600 mt-1">
                {{ formattedTimestamp }}
            </div>
            <div class="text-sm text-gray-800 mt-2 break-words">
                {{ log.message }}
            </div>
        </div>
    </div>
</template>