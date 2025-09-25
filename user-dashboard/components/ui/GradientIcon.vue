<script setup>
import { getAvailableColors, getBackgroundGradient } from '~/composables/useGradientColors.js';

// Props
const props = defineProps({
    icon: { type: String, required: false },
    value: { type: [String, Number], required: false },
    size: { type: String, default: 'md', validator: value => ['xs', 'sm', 'base', 'md', '2md', 'lg', 'xl', '2xl'].includes(value) },
    color: { type: String, default: 'purple', validator: value => getAvailableColors().includes(value) },
    withBlur: { type: Boolean, default: false }
});

// Size configurations
const sizeConfig = {
    'xs': {
        container: 'size-6 rounded-lg',
        containerValue: 'h-6 min-w-6 px-2 rounded-lg',
        icon: 'text-xs',
        radius: 'rounded-lg'
    },
    'sm': {
        container: 'size-8 rounded-xl',
        containerValue: 'h-8 min-w-8 px-2 rounded-xl',
        icon: 'text-sm',
        radius: 'rounded-xl'
    },
    'base': {
        container: 'size-10 rounded-xl',
        containerValue: 'h-10 min-w-10 px-3 rounded-xl',
        icon: 'text-base',
        radius: 'rounded-xl'
    },
    'md': {
        container: 'size-12 rounded-xl',
        containerValue: 'h-12 min-w-12 px-3 rounded-xl',
        icon: 'text-lg',
        radius: 'rounded-xl'
    },
    '2md': {
        container: 'size-14 rounded-2xl',
        containerValue: 'h-14 min-w-14 px-3 rounded-2xl',
        icon: 'text-2xl',
        radius: 'rounded-2xl'
    },
    'lg': {
        container: 'size-16 rounded-[1.2rem]',
        containerValue: 'h-16 min-w-16 px-4 rounded-[1.2rem]',
        icon: 'text-2xl',
        radius: 'rounded-[1.2rem]'
    },
    'xl': {
        container: 'size-18 rounded-3xl',
        containerValue: 'h-18 min-w-18 px-5 rounded-3xl',
        icon: 'text-3xl',
        radius: 'rounded-3xl'
    },
    '2xl': {
        container: 'size-24 rounded-4xl',
        containerValue: 'h-24 min-w-24 px-6 rounded-4xl',
        icon: 'text-4xl',
        radius: 'rounded-4xl'
    }
};

// The classes of the container
const containerClasses = computed(() => {
    const size = sizeConfig[props.size];
    const color = getBackgroundGradient(props.color);

    // Use containerValue classes when value prop is provided for adaptive width
    const containerSize = props.value !== undefined ? size.containerValue : size.container;

    return [
        'relative flex-shrink-0 flex justify-center items-center shadow-md',
        containerSize,
        `bg-gradient-to-br ${color}`
    ].join(' ');
});

// The classes of the content (icon or text)
const contentClasses = computed(() => {
    const size = sizeConfig[props.size];

    return [
        'relative z-10 text-white drop-shadow-sm',
        props.value !== undefined ? 'font-bold' : '', // Add font-bold for text values
        size.icon
    ].join(' ');
});
</script>

<template>
    <div class="relative inline-flex">
        <!-- Blur shadow -->
        <div v-if="props.withBlur" :class="['absolute inset-0 bg-gradient-to-r opacity-20 blur scale-110', sizeConfig[props.size].radius, getBackgroundGradient(props.color)]"></div>

        <!-- Icon container -->
        <div :class="containerClasses" class="space-x-2.5">
            <i v-if="props.icon" :class="[props.icon, contentClasses]"></i>
            <span v-if="props.value !== undefined" :class="contentClasses">{{ props.value }}</span>
        </div>
    </div>
</template>