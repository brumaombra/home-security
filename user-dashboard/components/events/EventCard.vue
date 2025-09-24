<script setup>
import { getImageUrl } from '~/composables/useUtils.js';
import { formatDateAndTime } from '~/composables/useFormatter.js';
import Card from '~/components/ui/Card.vue';

// Props
const props = defineProps({
    event: { type: Object, required: true }
});

// Emits
const emit = defineEmits(['click']);

// Handle card click
const handleClick = () => {
    emit('click', getImageUrl(props.event.imageFilename));
};
</script>

<template>
    <Card class="cursor-pointer hover:shadow-2xl hover:scale-102 transition-all duration-400 group overflow-hidden relative" @click="handleClick">
        <!-- Image -->
        <div class="relative">
            <img :src="getImageUrl(event.imageFilename)" :alt="event.imageFilename" class="w-full aspect-video object-cover rounded-2xl" loading="lazy" />
            <div class="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                <i class="fas fa-expand text-white text-sm"></i>
            </div>
        </div>

        <!-- Details -->
        <div class="pt-6">
            <!-- Date and time -->
            <div class="flex items-center text-sm font-medium text-slate-600 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <i class="fas fa-calendar-alt text-white text-xs"></i>
                </div>
                {{ formatDateAndTime(event.timestamp) }}
            </div>

            <!-- Stream ID -->
            <div class="flex items-center text-sm font-medium text-slate-600 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <i class="fas fa-video text-white text-xs"></i>
                </div>
                Stream: {{ event.streamId }}
            </div>

            <!-- Detections count -->
            <div class="flex items-center text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                <div class="w-8 h-8 bg-gradient-to-br from-violet-400 to-violet-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <i class="fas fa-eye text-white text-xs"></i>
                </div>
                {{ event.detectionsCount }} objects detected
            </div>
        </div>
    </Card>
</template>