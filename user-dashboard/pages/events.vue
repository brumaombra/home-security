<script setup>
import { ref, onMounted } from 'vue';
import EventsList from '~/components/events/EventsList.vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

const globalStore = useGlobalStore();
const loading = ref(false);
const error = ref(null);

// Load the events
const loadEvents = async () => {
    try {
        loading.value = true;
        const results = await $fetch('/api/events');
        globalStore.value.events = results.events || [];
    } catch (e) {
        error.value = e.message || 'Failed to load events';
    } finally {
        loading.value = false;
    }
};

// On component mounted
onMounted(() => {
    // Check if events are already loaded
    if (globalStore.value.events.length === 0) {
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

            <EventsList :events="globalStore.events" :loading="loading" :error="error" />
        </div>
    </div>
</template>