<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import PageTitle from '~/components/ui/PageTitle.vue';
import EventsList from '~/components/events/EventsList.vue';
import Button from '~/components/ui/Button.vue';
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue';

const globalStore = useGlobalStore();
const loading = ref(true);
const loadingMore = ref(false);
const error = ref(null);
const limit = ref(9);

// Load events
const loadEvents = async () => {
    error.value = null; // Reset error state

    try {
        // Fetch events
        loading.value = true;
        const result = await $fetch('/api/events', {
            params: {
                page: 1,
                limit: limit.value
            }
        });

        // Store the events and pagination info
        globalStore.value.events.results = result.results;
        globalStore.value.events.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load events';
    } finally {
        loading.value = false;
    }
};

// Load more events
const loadMore = async () => {
    loadingMore.value = true;

    try {
        // Increment page number for next batch
        const nextPage = globalStore.value.events.pagination.currentPage + 1;

        // Make API request for the next page
        const result = await $fetch('/api/events', {
            params: {
                page: nextPage,
                limit: limit.value
            }
        });

        // Store the events and pagination info
        globalStore.value.events.results = [...globalStore.value.events.results, ...result.results]; // Append new items to existing ones
        globalStore.value.events.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load more events';
    } finally {
        loadingMore.value = false;
    }
};

// On component mounted
onMounted(async () => {
    // Only fetch data if not already loaded
    if (globalStore.value.events.results.length === 0) {
        await loadEvents();
    } else {
        loading.value = false;
    }
});

// Page metadata
useHead({
    title: 'Home Security - Events'
});
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Events" subtitle="View all detected events from your home security system" icon="fas fa-shield-alt" />

        <!-- Refresh button -->
        <div class="flex justify-end mb-6">
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadEvents" />
        </div>

        <!-- Events list -->
        <EventsList :events="globalStore.events.results" :loading="loading && globalStore.events.results.length === 0" :error="error" />

        <!-- Load more button -->
        <LoadMoreButton v-if="globalStore.events.pagination.hasMore && !error"
            :busy="loadingMore"
            :text="`Load More (${globalStore.events.pagination.currentPage * globalStore.events.pagination.limit} of ${globalStore.events.pagination.total})`"
            @load-more="loadMore"
            class="mt-8" />
    </div>
</template>