<script setup>
import { ref } from 'vue';
import EventCard from '~/components/events/EventCard.vue';
import EventImageModal from '~/components/events/EventImageModal.vue';

// Props
const props = defineProps({
    events: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    error: { type: String, default: null }
});

const modalOpen = ref(false);
const selectedImage = ref('');

// Open the modal with the selected image
const openImageModal = imageSrc => {
    selectedImage.value = imageSrc;
    modalOpen.value = true;
};

// Close the modal
const closeImageModal = () => {
    modalOpen.value = false;
    selectedImage.value = '';
};
</script>

<template>
    <div>
        <!-- Loading state -->
        <div v-if="loading" class="text-center py-12">
            <div class="text-xl text-gray-500">Loading events...</div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
            <div class="text-xl text-red-500">{{ error }}</div>
        </div>

        <!-- Empty state -->
        <div v-else-if="events.length === 0" class="text-center py-12">
            <div class="text-xl text-gray-500">No events found</div>
        </div>

        <!-- Events grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <EventCard v-for="event in events" :key="event.id" :event="event" @click="openImageModal" />
        </div>

        <!-- Modal -->
        <EventImageModal :is-open="modalOpen" :image-src="selectedImage" @close="closeImageModal" />
    </div>
</template>