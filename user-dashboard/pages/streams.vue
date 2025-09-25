<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import PageTitle from '~/components/ui/PageTitle.vue';
import StreamsList from '~/components/streams/StreamsList.vue';
import AddStreamModal from '~/components/streams/AddStreamModal.vue';
import Button from '~/components/ui/Button.vue';
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue';

const globalStore = useGlobalStore();
const loading = ref(true);
const loadingMore = ref(false);
const error = ref(null);
const limit = ref(9);
const addStreamModalVisible = ref(false);
const pollingInterval = ref(null);

// Load streams
const loadStreams = async () => {
    error.value = null; // Reset error state

    try {
        // Fetch streams
        loading.value = true;
        const result = await $fetch('/api/streams', {
            params: {
                page: 1,
                limit: limit.value
            }
        });

        // Store the streams and pagination info
        globalStore.value.streams.results = result.results;
        globalStore.value.streams.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load streams';
    } finally {
        loading.value = false;
    }
};

// Load more streams
const loadMore = async () => {
    loadingMore.value = true;

    try {
        // Increment page number for next batch
        const nextPage = globalStore.value.streams.pagination.currentPage + 1;

        // Make API request for the next page
        const result = await $fetch('/api/streams', {
            params: {
                page: nextPage,
                limit: limit.value
            }
        });

        // Store the streams and pagination info
        globalStore.value.streams.results = [...globalStore.value.streams.results, ...result.results]; // Append new items to existing ones
        globalStore.value.streams.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load more streams';
    } finally {
        loadingMore.value = false;
    }
};

// Handle open add stream modal
const handleOpenAddStreamModal = () => {
    addStreamModalVisible.value = true;
};

// Start polling for streams
const startPolling = () => {
    // Clear any existing interval
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
    }

    // Set up new interval
    pollingInterval.value = setInterval(async () => {
        await loadStreams();
    }, 3000); // Poll every 3 seconds
};

// Stop polling
const stopPolling = () => {
    if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
    }
};

// On component mounted
onMounted(async () => {
    // Only fetch data if not already loaded
    if (globalStore.value.streams.results.length === 0) {
        await loadStreams();
    } else {
        loading.value = false;
    }

    // Start polling
    startPolling();
});

// On component unmounted
onUnmounted(() => {
    stopPolling(); // Clear polling interval
});
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Home Security Streams" subtitle="View all live streams from your home security system" icon="fas fa-video" />

        <!-- Refresh button -->
        <div class="flex justify-end mb-6 space-x-3">
            <Button text="Add Stream" type="primary" icon="fas fa-plus" @click="handleOpenAddStreamModal" />
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadStreams" />
        </div>

        <!-- Streams list -->
        <StreamsList :streams="globalStore.streams.results" :loading="loading && globalStore.streams.results.length === 0" :error="error" @restart-success="loadStreams" @delete-success="loadStreams" />

        <!-- Load more button -->
        <LoadMoreButton v-if="globalStore.streams.pagination.hasMore && !error"
            :busy="loadingMore"
            :text="`Load More (${globalStore.streams.pagination.currentPage * globalStore.streams.pagination.limit} of ${globalStore.streams.pagination.total})`"
            @load-more="loadMore"
            class="mt-8" />
    </div>

    <!-- Add Stream Modal -->
    <AddStreamModal v-model:visible="addStreamModalVisible" @stream-added="loadStreams" />
</template>