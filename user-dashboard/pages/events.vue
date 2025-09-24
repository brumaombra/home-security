<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore';

const globalStore = useGlobalStore();
const loading = ref(true);
const error = ref(null);
const modalOpen = ref(false);
const selectedImage = ref('');

// Load the events
const loadEvents = async () => {
    try {
        loading.value = true;
        const results = await $fetch('/api/events');
        globalStore.value.events = results || [];
    } catch (e) {
        error.value = e.message || 'Failed to load events';
    } finally {
        loading.value = false;
    }
};

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

// On component mounted
onMounted(() => {
    // Check if events are already loaded
    if (!globalStore.value.events.length) {
        loadEvents(); // Load events
    }
});
</script>

<template>
    <div class="py-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold text-gray-900 mb-2">🏠 Home Security Events</h1>
                <p class="text-lg text-gray-600">View all detected events from your home security system</p>
            </div>

            <div v-if="loading" class="text-center py-12">
                <div class="text-xl text-gray-500">Loading events...</div>
            </div>

            <div v-else-if="error" class="text-center py-12">
                <div class="text-xl text-red-500">{{ error }}</div>
            </div>

            <div v-else-if="globalStore.events.length === 0" class="text-center py-12">
                <div class="text-xl text-gray-500">No events found</div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <div v-for="event in globalStore.events" :key="event.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer" @click="openImageModal(`/images/${event.imageFilename}`)">
                    <img :src="`/images/${event.imageFilename}`" :alt="event.imageFilename" class="w-full h-48 object-cover" loading="lazy" />
                    <div class="p-4">
                        <div class="text-sm text-gray-500 mb-1">
                            {{ new Date(event.timestamp).toLocaleString() }}
                        </div>
                        <div class="text-sm text-gray-600 mb-1">
                            Stream: {{ event.streamId }}
                        </div>
                        <div class="text-sm text-gray-700">
                            {{ event.detectionsCount }} objects detected
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="modalOpen" class="fixed inset-0 bg-gray-800/80 flex items-center justify-center z-50" @click="closeImageModal">
            <img :src="selectedImage" alt="Event image" class="max-w-90 max-h-90 object-contain" @click.stop />
        </div>
    </div>
</template>