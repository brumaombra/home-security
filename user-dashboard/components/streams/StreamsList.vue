<script setup>
import StreamCard from '~/components/streams/StreamCard.vue';

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
        <div v-if="loading" class="text-center py-12">
            <div class="text-xl text-gray-500">Loading streams...</div>
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="text-center py-12">
            <div class="text-xl text-red-500">{{ error }}</div>
        </div>

        <!-- Empty state -->
        <div v-else-if="streams.length === 0" class="text-center py-12">
            <div class="text-xl text-gray-500">No streams found</div>
        </div>

        <!-- Streams grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <StreamCard v-for="stream in streams" :key="stream.streamId" :stream="stream" @restart-success="handleRestartSuccess" @delete-success="handleDeleteSuccess" />
        </div>
    </div>
</template>