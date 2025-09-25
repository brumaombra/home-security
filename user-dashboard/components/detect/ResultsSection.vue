<script setup>
import Card from '~/components/ui/Card.vue';
import DetectionItem from '~/components/detect/DetectionItem.vue';

// Props
const props = defineProps({
    results: { type: Object, default: null }
});
</script>

<template>
    <Card v-if="results" class="mt-8">
        <!-- Title -->
        <div class="bg-blue-50 p-6 rounded-2xl mb-6 border border-blue-100/50">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-search text-white text-lg"></i>
                </div>
                <div>
                    <h3 class="text-gray-900 text-2xl font-bold">Detection Results</h3>
                    <div class="text-blue-700 font-semibold text-xl">Found {{ results.detections?.length }} objects</div>
                </div>
            </div>
        </div>

        <!-- Detection items -->
        <div class="space-y-4">
            <DetectionItem v-for="(detection, index) in results.detections" :key="index" :detection="detection" />
        </div>
    </Card>
</template>