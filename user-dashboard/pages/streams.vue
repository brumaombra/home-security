<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import PageTitle from '~/components/ui/PageTitle.vue';
import StreamsList from '~/components/streams/StreamsList.vue';
import Button from '~/components/ui/Button.vue';
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

const globalStore = useGlobalStore();
const loading = ref(false);
const loadingMore = ref(false);
const error = ref(null);
const limit = ref(9);
const addStreamModalOpen = ref(false);
const newStreamUrl = ref('');
const addingStream = ref(false);
const pollingInterval = ref(null);

// Load streams
const loadStreams = async () => {
    error.value = null; // Reset error state

    try {
        loading.value = true;

        // Fetch streams
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

// Add new stream
const addStream = async () => {
    if (!newStreamUrl.value.trim()) {
        alert('Please enter a stream URL');
        return;
    }

    addingStream.value = true;
    try {
        await $fetch('/api/streams', {
            method: 'POST',
            body: { streamUrl: newStreamUrl.value.trim() }
        });
        newStreamUrl.value = '';
        addStreamModalOpen.value = false;
        await loadStreams(); // Refresh the list
    } catch (error) {
        alert(`Error adding stream: ${error.message}`);
    } finally {
        addingStream.value = false;
    }
};

// Handle open add stream modal
const handleOpenAddStreamModal = () => {
    addStreamModalOpen.value = true;
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
        <div class="flex justify-end mb-6">
            <Button text="Add Stream" type="success" icon="fas fa-plus" @click="handleOpenAddStreamModal" class="mr-3" />
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadStreams" />
        </div>

        <!-- Streams list -->
        <StreamsList :streams="globalStore.streams.results" :loading="loading && globalStore.streams.results.length === 0" :error="error" @restart-success="loadStreams" @delete-success="loadStreams" />

        <!-- Load more button -->
        <LoadMoreButton v-if="globalStore.streams.pagination.hasMore" :busy="loadingMore" :text="`Load More (${globalStore.streams.pagination.currentPage * globalStore.streams.pagination.limit} of ${globalStore.streams.pagination.total})`" @load-more="loadMore" class="mt-8" />
    </div>

    <!-- Add Stream Modal -->
    <div v-if="addStreamModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 class="text-lg font-semibold mb-4">Add New Stream</h3>
            <div class="mb-4">
                <label for="streamUrl" class="block text-sm font-medium text-gray-700 mb-2">Stream URL</label>
                <input id="streamUrl" v-model="newStreamUrl" type="url" placeholder="rtsp://example.com/stream" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" @keyup.enter="addStream" />
            </div>
            <div class="flex justify-end space-x-3">
                <Button text="Cancel" type="secondary" @click="addStreamModalOpen = false" />
                <Button text="Add Stream" type="success" :disabled="addingStream" :icon="addingStream ? 'fas fa-spinner fa-spin' : 'fas fa-plus'" @click="addStream" />
            </div>
        </div>
    </div>
</template>