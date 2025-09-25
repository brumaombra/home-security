<script setup>
import { showMessageToast, downloadBase64Image } from '~/composables/useUtils.js';
import UploadSection from '~/components/detect/UploadSection.vue';
import PreviewSection from '~/components/detect/PreviewSection.vue';
import ResultsSection from '~/components/detect/ResultsSection.vue';
import PageTitle from '~/components/ui/PageTitle.vue';

const selectedFile = ref(null);
const previewUrl = ref('');
const isAnalyzing = ref(false);
const results = ref(null);

// Handle file selection from UploadSection
const handleFileSelected = file => {
    selectedFile.value = file;
    const reader = new FileReader();

    // Reading function
    reader.onload = event => {
        previewUrl.value = event.target.result;
        results.value = null;
    };

    // Fire the file read
    reader.readAsDataURL(file);
};

// Analyze the selected image
const analyzeImage = async () => {
    // Validation
    if (!selectedFile.value) {
        showMessageToast({ message: 'Please select an image first.', type: 'error' });
        return;
    }

    try {
        // Create form data
        isAnalyzing.value = true;
        const formData = new FormData();
        formData.append('image', selectedFile.value);
        formData.append('generateImage', true);

        // Call the detection API
        const response = await $fetch('/api/detect', {
            method: 'POST',
            body: formData
        });

        // Update results and preview
        results.value = response;
        if (response.annotatedImage) {
            previewUrl.value = response.annotatedImage;
        }

        // Success message
        showMessageToast({ message: `Analysis complete! Found ${response.detections.length} objects.`, type: 'success' });
    } catch (error) {
        showMessageToast({ message: `Error: ${error.message}`, type: 'error' });
    } finally {
        isAnalyzing.value = false;
    }
};

// Download the annotated image as a Base64 file
const downloadFromBase64 = () => {
    // Validation
    if (!results.value || !results.value.annotatedImage) {
        showMessageToast({ message: 'No annotated image available to download.', type: 'error' });
        return;
    }

    // Download the annotated image
    downloadBase64Image(results.value.annotatedImage, selectedFile.value.name || 'image.jpg');
};
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Object Recognition" subtitle="Upload an image to detect and identify objects using AI" icon="fas fa-search" />

        <!-- Main content -->
        <div class="space-y-8">
            <!-- Upload section -->
            <UploadSection @file-selected="handleFileSelected" />

            <!-- Preview section -->
            <PreviewSection :file="selectedFile" :preview-url="previewUrl" :is-analyzing="isAnalyzing" :results="results" @analyze="analyzeImage" @download="downloadFromBase64" />

            <!-- Results section -->
            <ResultsSection :results="results" />
        </div>
    </div>
</template>