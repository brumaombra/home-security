<script setup>
import StreamCard from '~/components/streams/StreamCard.vue';
import EmptyState from '~/components/ui/EmptyState.vue';
import LoadingState from '~/components/ui/LoadingState.vue';
import ErrorState from '~/components/ui/ErrorState.vue';

// Props
const props = defineProps({
    streams: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    error: { type: String, default: null }
});

// Emits
const emit = defineEmits(['restart-success', 'delete-success']);

// Handle restart success from child component
const handleRestartSuccess = () => {
    emit('restart-success');
};

// Handle delete success from child component
const handleDeleteSuccess = () => {
    emit('delete-success');
};
</script>

<template>
    <div>
        <!-- Loading state -->
        <LoadingState v-if="loading" text="Loading streams..." />

        <!-- Error state -->
        <ErrorState v-else-if="error" title="Failed to load streams" :message="error" />

        <!-- Empty state -->
        <EmptyState v-else-if="streams.length === 0" icon="fas fa-video-slash" title="No streams found" description="There are no video streams configured yet." />

        <!-- Streams grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StreamCard v-for="(stream, index) in streams" :key="stream.streamId" :stream="stream" @restart-success="handleRestartSuccess" @delete-success="handleDeleteSuccess" data-aos="fade-up" :data-aos-delay="(index % 3) * 100" />
        </div>
    </div>
</template>