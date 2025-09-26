<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import { callVideoService } from '~/composables/useUtils.js';
import PageTitle from '~/components/ui/PageTitle.vue';
import LogsList from '~/components/logs/LogsList.vue';
import Button from '~/components/ui/Button.vue';
import LoadMoreButton from '~/components/ui/LoadMoreButton.vue';

const globalStore = useGlobalStore();
const loading = ref(true);
const loadingMore = ref(false);
const error = ref(null);
const limit = ref(20);

// Load logs
const loadLogs = async () => {
    error.value = null; // Reset error state

    try {
        // Fetch logs
        loading.value = true;
        const result = await callVideoService('/api/logs', {
            params: {
                page: 1,
                limit: limit.value
            }
        });

        // Store the logs and pagination info
        globalStore.value.logs.results = result.results;
        globalStore.value.logs.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load logs';
    } finally {
        loading.value = false;
    }
};

// Load more logs
const loadMore = async () => {
    loadingMore.value = true;

    try {
        // Increment page number for next batch
        const nextPage = globalStore.value.logs.pagination.currentPage + 1;

        // Make API request for the next page
        const result = await callVideoService('/api/logs', {
            params: {
                page: nextPage,
                limit: limit.value
            }
        });

        // Store the logs and pagination info
        globalStore.value.logs.results = [...globalStore.value.logs.results, ...result.results]; // Append new items to existing ones
        globalStore.value.logs.pagination = result.pagination;
    } catch (err) {
        error.value = err.message || 'Failed to load more logs';
    } finally {
        loadingMore.value = false;
    }
};

// On component mounted
onMounted(async () => {
    // Only fetch data if not already loaded
    if (globalStore.value.logs.results.length === 0) {
        await loadLogs();
    } else {
        loading.value = false;
    }
});

// Page metadata
useHead({
    title: 'Home Security - Logs'
});
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Logs" subtitle="View all logs from your home security system" icon="fas fa-list" />

        <!-- Refresh button -->
        <div class="flex justify-end mb-6">
            <Button text="Refresh" type="primary" :disabled="loading" icon="fas fa-sync" @click="loadLogs" />
        </div>

        <!-- Logs list -->
        <LogsList :logs="globalStore.logs.results" :loading="loading && globalStore.logs.results.length === 0" :error="error" />

        <!-- Load more button -->
        <LoadMoreButton v-if="globalStore.logs.pagination.hasMore && !error"
            :busy="loadingMore"
            :text="`Load More (${globalStore.logs.pagination.currentPage * globalStore.logs.pagination.limit} of ${globalStore.logs.pagination.total})`"
            @load-more="loadMore"
            class="mt-8" />
    </div>
</template>