<script setup>
// Props
const props = defineProps({
    detection: { type: Object, default: null }
});

// Format confidence percentage
const confidence = computed(() => Math.round(props.detection.score * 100));
</script>

<template>
    <div class="flex justify-between items-center bg-white border border-gray-200 rounded-2xl p-6">
        <!-- Detection details -->
        <div class="flex flex-col">
            <div class="font-bold text-gray-900 text-lg capitalize">{{ detection.class }}</div>
            <div class="text-sm text-gray-600 mt-1">
                Position: ({{ detection.bbox.x }}, {{ detection.bbox.y }}) •
                Size: {{ detection.bbox.width }}x{{ detection.bbox.height }}
            </div>
        </div>

        <!-- Confidence bar -->
        <div class="flex items-center">
            <div class="w-24 h-2 bg-gray-200 rounded mr-3">
                <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded" :style="{ width: confidence + '%' }"></div>
            </div>
            <div class="font-semibold text-blue-600">{{ confidence }}%</div>
        </div>
    </div>
</template>