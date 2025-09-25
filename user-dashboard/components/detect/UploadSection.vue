<script setup>
import { showMessageToast } from '~/composables/useUtils.js';
import Card from '~/components/ui/Card.vue';
import Button from '~/components/ui/Button.vue';

// Emits
const emit = defineEmits(['file-selected']);

const fileInput = ref(null);
const isDragOver = ref(false);

// Trigger file input click
const triggerFileSelect = () => {
    fileInput.value.click();
};

// Handle file selection
const handleFileSelect = event => {
    const file = event.target.files[0];
    if (file) {
        emit('file-selected', file);
    }
};

// Handle drag and drop
const handleDrop = event => {
    isDragOver.value = false;
    const files = event.dataTransfer?.files || [];
    if (files.length === 0) return; // Exit if no files
    const file = files[0];
    if (file.type.startsWith('image/')) {
        emit('file-selected', file);
    } else {
        showMessageToast({ message: 'Please select a valid image file.', type: 'error' }); // Handle error
    }
};
</script>

<template>
    <Card>
        <div class="flex flex-col items-center border-3 border-dashed border-gray-300 rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50/50" :class="{ 'border-blue-500 bg-blue-50': isDragOver }" @dragover.prevent="isDragOver = true" @dragleave="isDragOver = false" @drop.prevent="handleDrop">
            <div class="text-6xl mb-5 text-gray-300">📸</div>
            <h3 class="text-gray-900 mb-2 text-lg font-medium">Choose an image or drag & drop</h3>
            <p class="text-gray-500 mb-5">Supported formats: JPG, PNG, GIF, WebP (max 10MB)</p>
            <Button text="Select Image" type="primary" icon="fas fa-upload" @click="triggerFileSelect" />
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />
        </div>
    </Card>
</template>