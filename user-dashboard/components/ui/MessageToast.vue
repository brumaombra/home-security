<script setup>
import { computed } from 'vue';
import { getBackgroundGradient } from '~/composables/useGradientColors.js';

// Props
const props = defineProps({
    visible: { type: Boolean, default: false },
    type: { type: String, default: 'error', validator: value => ['success', 'error', 'info'].includes(value) },
    message: { type: String, default: '' }
});

// Emits
const emit = defineEmits(['update:visible']);

const gradientName = computed(() => getGradientColorFromMessageType(props.type));

// Get gradient color based on message type
const getGradientColorFromMessageType = type => {
    const colorMap = {
        success: 'green',
        error: 'danger',
        info: 'indigo-purple'
    };

    return colorMap[type] || 'indigo-purple';
};

// Handle dismiss toast
const handleDismissToastPress = () => {
    emit('update:visible', false);
};
</script>

<template>
    <Transition enter-active-class="transition-all duration-300 ease-in-out" enter-from-class="translate-y-full opacity-0" leave-active-class="transition-all duration-300 ease-in-out" leave-to-class="translate-y-2 opacity-0">
        <!-- Gradient border wrapper -->
        <div v-if="props.visible" :class="['fixed bottom-6 right-6 max-w-[350px] min-w-[250px] rounded-xl pl-1 bg-gradient-to-b shadow-md z-50', getBackgroundGradient(gradientName)]">
            <!-- Inner content with background -->
            <div class="rounded-xl p-4 bg-white dark:bg-gray-800 h-full" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="flex items-center">
                    <!-- Icon based on type -->
                    <div class="mr-3 flex-shrink-0">
                        <i v-if="props.type === 'success'" class="fas fa-circle-check text-lg bg-clip-text text-transparent bg-gradient-to-br from-green-500 to-green-600"></i>
                        <i v-else-if="props.type === 'error'" class="fas fa-circle-exclamation text-lg bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-red-600"></i>
                        <i v-else class="fas fa-circle-info text-lg bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600"></i>
                    </div>

                    <!-- Message text -->
                    <p class="flex-grow text-sm font-medium m-0 text-gray-800 dark:text-gray-300">{{ props.message }}</p>

                    <!-- Dismiss button -->
                    <button type="button" class="ml-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 text-xl bg-transparent border-none cursor-pointer opacity-70 hover:opacity-100 transition-opacity duration-200 focus:outline-none" aria-label="Close" @click="handleDismissToastPress">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>