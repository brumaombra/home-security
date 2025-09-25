<script setup>
import Button from '~/components/ui/Button.vue';

// Props
const props = defineProps({
    file: { type: File, default: null },
    previewUrl: { type: String, required: true },
    isAnalyzing: { type: Boolean, required: true },
    results: { type: Object, default: null }
});

// Emits
const emit = defineEmits(['analyze', 'download']);

// Handle analyze
const analyze = () => {
    emit('analyze');
};

// Handle download
const download = () => {
    emit('download');
};
</script>

<template>
    <div v-if="file" class="text-center">
        <!-- Preview image -->
        <img :src="previewUrl" class="max-w-full max-h-96 rounded-3xl shadow-xl mx-auto mb-6" alt="Preview" />

        <!-- Action buttons -->
        <div class="flex justify-center gap-4">
            <Button :text="isAnalyzing ? 'Analyzing...' : 'Analyze Image'" type="primary" icon="fas fa-magnifying-glass" :disabled="isAnalyzing" :pulse="isAnalyzing" @click="analyze" />
            <Button v-if="results" text="Save as Base64" type="primary" icon="fas fa-save" @click="download" />
        </div>
    </div>
</template>