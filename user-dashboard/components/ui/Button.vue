<script setup>
// Props
const props = defineProps({
    text: { type: String, default: '' },
    type: { type: String, default: 'primary', validator: value => ['primary', 'secondary', 'danger', 'success'].includes(value) },
    disabled: { type: Boolean, default: false },
    icon: { type: String, default: '' },
    iconEnd: { type: String, default: '' },
    class: { type: String, default: '' },
    submit: { type: Boolean, default: false },
    pulse: { type: Boolean, default: false }
});

// Emits
const emits = defineEmits(['click']);

// Button styles based on type
const getButtonStyles = type => {
    const styles = {
        primary: `bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg`,
        secondary: 'bg-white text-gray-500 border border-gray-200/50 shadow-lg shadow-gray-500/10 hover:bg-white',
        danger: 'bg-gradient-to-r from-red-500 via-orange-500 to-pink-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:from-red-600 hover:via-orange-600 hover:to-pink-700',
        success: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:from-green-600 hover:to-green-700'
    };
    return styles[type] || styles.primary;
};

// Handle click
const handleClick = () => {
    emits('click');
};
</script>

<template>
    <button :type="props.submit ? 'submit' : 'button'" @click="handleClick" :disabled="props.disabled" :class="['uppercase py-3 px-4 flex items-center justify-center gap-x-2.5 h-[52px] min-w-[52px] text-sm font-black rounded-xl disabled:opacity-50 cursor-pointer disabled:pointer-events-none transition-all duration-300 hover:scale-105', getButtonStyles(props.type), props.class, { 'animate-pulse': props.pulse }]">
        <i v-if="props.icon" :class="[props.icon, 'flex items-center']"></i>
        {{ props.text }}
        <i v-if="props.iconEnd" :class="[props.iconEnd, 'flex items-center']"></i>
        <slot></slot>
    </button>
</template>