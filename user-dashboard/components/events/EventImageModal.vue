<script setup>
// Props
const props = defineProps({
    isOpen: { type: Boolean, default: false },
    imageSrc: { type: String, default: '' }
});

// Emits
const emit = defineEmits(['close']);

// Close the modal
const closeModal = () => {
    emit('close');
};
</script>

<template>
    <!-- Modal -->
    <div v-if="isOpen" class="fixed inset-0 bg-gray-800/80 flex items-center justify-center z-50" @click="closeModal">
        <img :src="imageSrc" alt="Event image" class="max-w-90 max-h-90 object-contain" @click.stop />
    </div>
</template>