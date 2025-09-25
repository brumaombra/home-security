<script setup>
import LogItem from '~/components/logs/LogItem.vue';
import EmptyState from '~/components/ui/EmptyState.vue';
import LoadingState from '~/components/ui/LoadingState.vue';
import ErrorState from '~/components/ui/ErrorState.vue';

// Props
const props = defineProps({
    logs: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false },
    error: { type: String, default: null }
});
</script>

<template>
    <div>
        <!-- Loading state -->
        <LoadingState v-if="loading" text="Loading logs..." />

        <!-- Error state -->
        <ErrorState v-else-if="error" title="Failed to load logs" :message="error" />

        <!-- Empty state -->
        <EmptyState v-else-if="logs.length === 0" icon="fas fa-list" title="No logs found" description="There are no logs to display at the moment." />

        <!-- Logs list -->
        <div v-else class="space-y-4">
            <div v-for="(log, index) in logs" :key="log.id" data-aos="fade-up" :data-aos-delay="(index % 10) * 50">
                <LogItem :log="log" />
            </div>
        </div>
    </div>
</template>