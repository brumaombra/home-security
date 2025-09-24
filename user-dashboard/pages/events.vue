<script setup>
import { ref, onMounted } from 'vue';
import PageTitle from '~/components/ui/PageTitle.vue';
import EventsList from '~/components/events/EventsList.vue';
import Button from '~/components/ui/Button.vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

const globalStore = useGlobalStore();
const loading = ref(false);
const error = ref(null);

// Load the events
const loadEvents = async () => {
    try {
        loading.value = true;
        const result = await $fetch('/api/events');
        globalStore.value.events = result;
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
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Home Security Events" subtitle="View all detected events from your home security system" icon="fas fa-shield-alt" />

        <!-- Refresh button -->
        <div class="flex justify-end mb-6">
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadEvents" />
        </div>

        <!-- Events list -->
        <EventsList :events="globalStore.events.results" :loading="loading" :error="error" />
    </div>
</template>