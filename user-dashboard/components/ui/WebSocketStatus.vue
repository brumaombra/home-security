<script setup>
import { computed } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

const globalStore = useGlobalStore();

// Reactive connection status from global store
const connectionStatus = computed(() => globalStore.value.websocket.status);

// Status configuration
const statusConfig = computed(() => {
    const configs = {
        connected: {
            iconClasses: 'fas fa-circle text-green-500',
            label: 'Connected'
        },
        connecting: {
            iconClasses: 'fas fa-circle-notch fa-spin text-yellow-500',
            label: 'Connecting'
        },
        disconnected: {
            iconClasses: 'fas fa-circle text-red-500',
            label: 'Disconnected'
        }
    };

    return configs[connectionStatus.value] || configs.disconnected;
});
</script>

<template>
    <div class="flex items-center space-x-2 px-3 py-2 rounded-xl border border-gray-200 transition-all duration-300">
        <!-- Status indicator -->
        <div>
            <i :class="[statusConfig.iconClasses, 'text-sm animate-pulse']" />
        </div>

        <!-- Status text -->
        <span class="hidden md:inline text-sm font-medium text-gray-700">
            {{ statusConfig.label }}
        </span>
    </div>
</template>

<style scoped>
/* Custom pulse animation for better visibility */
@keyframes custom-pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

.animate-pulse {
    animation: custom-pulse 2s cubic-bezier(0.3, 0, 0.6, 1) infinite;
}
</style>