<script setup>
import { ref } from 'vue';
import EventCard from '~/components/events/EventCard.vue';
import EventImageModal from '~/components/events/EventImageModal.vue';
import EmptyState from '~/components/ui/EmptyState.vue';
import LoadingState from '~/components/ui/LoadingState.vue';
import ErrorState from '~/components/ui/ErrorState.vue';

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
        <LoadingState v-if="loading" text="Loading events..." />

        <!-- Error state -->
        <ErrorState v-else-if="error" title="Failed to load events" :message="error" />

        <!-- Empty state -->
        <EmptyState v-else-if="events.length === 0" icon="fas fa-calendar-times" title="No events found" description="There are no security events to display at the moment." />

        <!-- Events grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="(event, index) in events" :key="event.id" data-aos="fade-up" :data-aos-delay="(index % 3) * 100">
                <EventCard :event="event" @click="openImageModal" />
            </div>
        </div>

        <!-- Modal -->
        <EventImageModal :is-open="modalOpen" :image-src="selectedImage" @close="closeImageModal" />
    </div>
</template>