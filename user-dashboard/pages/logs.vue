<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import PageTitle from '~/components/ui/PageTitle.vue';
import LogsList from '~/components/logs/LogsList.vue';
import Button from '~/components/ui/Button.vue';

const globalStore = useGlobalStore();
const loading = ref(true);
const error = ref(null);
const limit = ref(20);
let pollingInterval = null;

// Load logs
const loadLogs = async () => {
    error.value = null; // Reset error state

    try {
        // Fetch logs
        loading.value = true;
        const result = await $fetch('/api/logs', {
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

// Start polling
const startPolling = () => {
    pollingInterval = setInterval(loadLogs, 5000); // Poll every 5 seconds
};

// Stop polling
const stopPolling = () => {
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
};

// On component mounted
onMounted(async () => {
    await loadLogs();
    startPolling();
});

// On component unmounted
onUnmounted(() => {
    stopPolling();
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
    </div>
</template>