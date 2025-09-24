<script setup>
import { ref, onMounted } from 'vue';
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

// On component mounted
onMounted(async () => {
    // Only fetch data if not already loaded
    if (globalStore.value.streams.results.length === 0) {
        await loadStreams();
    } else {
        loading.value = false;
    }
});
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Home Security Streams" subtitle="View all live streams from your home security system" icon="fas fa-video" />

        <!-- Refresh button -->
        <div class="flex justify-end mb-6">
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadStreams" />
        </div>

        <!-- Streams list -->
        <StreamsList :streams="globalStore.streams.results" :loading="loading && globalStore.streams.results.length === 0" :error="error" />

        <!-- Load more button -->
        <LoadMoreButton v-if="globalStore.streams.pagination.hasMore"
            :busy="loadingMore"
            :text="`Load More (${globalStore.streams.pagination.currentPage * globalStore.streams.pagination.limit} of ${globalStore.streams.pagination.total})`"
            @load-more="loadMore"
            class="mt-8" />
    </div>
</template>