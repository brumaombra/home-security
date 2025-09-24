<script setup>
import { ref } from 'vue';

const events = ref([]);
const loading = ref(true);
const error = ref(null);
const modalOpen = ref(false);
const selectedImage = ref('');

const loadEvents = async () => {
    try {
        loading.value = true;
        const data = await $fetch('/api/events');
        events.value = data || [];
    } catch (e) {
        error.value = e.message || 'Failed to load events';
    } finally {
        loading.value = false;
    }
};

const openModal = (imageSrc) => {
    selectedImage.value = imageSrc;
    modalOpen.value = true;
};

const closeModal = () => {
    modalOpen.value = false;
    selectedImage.value = '';
};

onMounted(() => {
    loadEvents();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50 py-8">
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

            <div v-else-if="events.length === 0" class="text-center py-12">
                <div class="text-xl text-gray-500">No events found</div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer" @click="openModal(`/images/${event.imageFilename}`)">
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
        <div v-if="modalOpen" class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" @click="closeModal">
            <img :src="selectedImage" alt="Event image" class="max-w-90 max-h-90 object-contain" @click.stop />
        </div>
    </div>
</template>