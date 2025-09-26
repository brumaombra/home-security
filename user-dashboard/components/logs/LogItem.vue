<script setup>
import { formatDateAndTime } from '~/composables/useFormatter.js';

// Props
const props = defineProps({
    log: { type: Object, default: null }
});

// Icon class based on type
const iconClass = computed(() => {
    const base = 'text-xl';
    const icon = props.log.type === 'error' ? 'fas fa-exclamation-triangle' : 'fas fa-info-circle';
    const color = props.log.type === 'error' ? 'text-red-600' : 'text-blue-600';
    return `${base} ${icon} ${color}`;
});
</script>

<template>
    <div class="flex items-center space-x-3 bg-white border border-gray-200 rounded-2xl p-4">
        <!-- Icon -->
        <i :class="iconClass" class="flex-shrink-0" />

        <!-- Log details -->
        <div class="flex-1 min-w-0">
            <div class="text-sm text-gray-600">
                {{ formatDateAndTime(log.timestamp) }}
            </div>
            <div class="text-sm text-gray-800 mt-1 break-words">
                {{ log.message }}
            </div>
        </div>
    </div>
</template>