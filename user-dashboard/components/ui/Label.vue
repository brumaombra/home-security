<script setup>
import { getBackgroundGradient } from '~/composables/useGradientColors.js';

// Props
const props = defineProps({
    text: { type: String, default: '' },
    for: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    required: { type: Boolean, default: false }
});
</script>

<template>
    <label :for="props.for" :placeholder="props.placeholder" class="flex items-center gap-3 min-h-[28px]">
        <!-- Modern blue line -->
        <div :class="['w-1 h-6 rounded-full bg-gradient-to-b', getBackgroundGradient('blue')]"></div>

        <!-- Label text -->
        <span class="text-sm font-semibold text-gray-800">
            {{ props.text }}
        </span>
    </label>
</template>