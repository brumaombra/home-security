<script setup>
// Props
const props = defineProps({
    visible: { type: Boolean, default: false }
});
</script>

<template>
    <Transition name="fade">
        <div v-if="props.visible" class="fixed inset-0 bg-white/80 z-[9999] flex flex-col items-center justify-center pointer-events-auto" role="dialog" aria-modal="true" aria-label="Loading content">
            <i class="fas fa-spinner fa-spin text-6xl text-blue-500 animate-float-up-down"></i>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>