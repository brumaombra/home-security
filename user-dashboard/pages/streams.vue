<script setup>
import { ref, onMounted } from 'vue';
import PageTitle from '~/components/ui/PageTitle.vue';
import StreamsList from '~/components/streams/StreamsList.vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

const globalStore = useGlobalStore();
const loading = ref(false);
const error = ref(null);

// Load the streams
const loadStreams = async () => {
    try {
        loading.value = true;
        const results = await $fetch('/api/streams');
        globalStore.value.streams = results.streams || [];
    } catch (e) {
        error.value = e.message || 'Failed to load streams';
    } finally {
        loading.value = false;
    }
};

// On component mounted
onMounted(() => {
    // Check if streams are already loaded
    if (globalStore.value.streams.length === 0) {
        loadStreams(); // Load streams
    }
});
</script>

<template>
    <div class="max-w-7xl mx-auto">
        <!-- Page title -->
        <PageTitle title="Home Security Streams" subtitle="View all live streams from your home security system" icon="fas fa-video" />

        <!-- Streams list -->
        <StreamsList :streams="globalStore.streams" :loading="loading" :error="error" />
    </div>
</template>