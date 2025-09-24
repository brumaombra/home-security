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
    <Card class="cursor-pointer hover:shadow-lg transition-shadow duration-200" @click="handleClick">
        <img :src="getImageUrl(event.imageFilename)" :alt="event.imageFilename" class="w-full h-48 object-cover rounded-t-3xl" loading="lazy" />
        <div>
            <div class="text-sm text-gray-500 mb-1">
                {{ formatDateAndTime(event.timestamp) }}
            </div>
            <div class="text-sm text-gray-600 mb-1">
                Stream: {{ event.streamId }}
            </div>
            <div class="text-sm text-gray-700">
                {{ event.detectionsCount }} objects detected
            </div>
        </div>
    </Card>
</template>