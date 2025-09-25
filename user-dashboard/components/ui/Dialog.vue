<script setup>
import { computed } from 'vue';
import { getAvailableColors, getSoftGradient } from '~/composables/useGradientColors.js';

// Props
const props = defineProps({
    visible: { type: Boolean, default: false },
    themeColor: { type: String, default: '', validator: value => getAvailableColors().includes(value) },
    size: { type: String, default: 'md', validator: value => ['sm', 'md', 'lg', 'xl'].includes(value) }
});

// Compute class for preset sizes or inline style for numeric sizes
const sizeClass = computed(() => {
    const map = {
        sm: 'sm:max-w-lg',
        md: 'sm:max-w-xl',
        lg: 'sm:max-w-2xl',
        xl: 'sm:max-w-4xl'
    };

    return map[props.size] || map['md'];
});
</script>

<template>
    <Transition name="modal-fade">
        <div v-if="props.visible" class="fixed inset-0 z-40 overflow-hidden bg-gray-900/50">
            <div class="flex min-h-screen items-center justify-center p-4">
                <div :class="['relative flex flex-col overflow-hidden w-full max-h-[90vh] rounded-xl bg-white dark:bg-gray-800 animate-slideUp', sizeClass]">
                    <!-- Gradients in the corners -->
                    <div v-if="props.themeColor" :class="['absolute top-0 right-0 w-1/4 h-1/4 rounded-bl-[90%] pointer-events-none z-0 bg-gradient-to-r', getSoftGradient(props.themeColor)]"></div>
                    <div v-if="props.themeColor" :class="['absolute bottom-0 left-0 w-1/4 h-1/4 rounded-tr-[90%] pointer-events-none z-0 bg-gradient-to-r', getSoftGradient(props.themeColor)]"></div>

                    <!-- Body -->
                    <div class="p-6 md:p-8 pb-4 md:pb-5 flex-1 overflow-y-auto relative z-10">
                        <slot name="body"></slot>
                    </div>

                    <!-- Footer -->
                    <div class="flex-none flex justify-end items-center gap-x-2 py-3 px-4 relative z-10">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>