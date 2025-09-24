<script setup>
import { computed } from 'vue';
import Card from '~/components/ui/Card.vue';
import Button from '~/components/ui/Button.vue';

// Props
const props = defineProps({
    stream: { type: Object, required: true }
});

// Emits
const emit = defineEmits(['restart-success']);

// Computed for icon class
const iconClass = computed(() => {
    const base = 'fas text-gray-500 text-4xl';
    return props.stream?.status === 'inactive' ? `${base} fa-video-slash` : `${base} fa-video`;
});

// Restart stream
const restartStream = async () => {
    try {
        await $fetch(`/api/streams/restart/${props.stream.streamId}`, { method: 'POST' }); // Call the restart API
        emit('restart-success'); // Notify parent to refresh streams
    } catch (error) {
        alert(`Error restarting stream: ${error.message}`);
    }
};

// Get status formatting info
const getStatusInfo = status => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-bold uppercase';
    switch (status) {
        case 'active':
            return {
                classes: `${baseClasses} bg-green-100 text-green-800`,
                text: 'active'
            };
        case 'inactive':
            return {
                classes: `${baseClasses} bg-red-100 text-red-800`,
                text: 'inactive'
            };
        default:
            return {
                classes: `${baseClasses} bg-yellow-100 text-yellow-800`,
                text: status || 'unknown'
            };
    }
};
</script>

<template>
    <Card class="overflow-hidden relative">
        <!-- Placeholder for stream video/image -->
        <div class="relative">
            <!-- Icon -->
            <div class="w-full aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                <i :class="iconClass"></i>
            </div>

            <!-- Status badge -->
            <div class="absolute top-3 right-3">
                <span :class="getStatusInfo(props.stream.status).classes">
                    {{ getStatusInfo(props.stream.status).text }}
                </span>
            </div>
        </div>

        <!-- Details -->
        <div class="pt-6 space-y-4">
            <!-- Stream name/ID -->
            <div class="flex items-center text-sm font-medium text-slate-600">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <i class="fas fa-video text-white text-xs"></i>
                </div>
                Stream: {{ props.stream.streamId }}
            </div>

            <!-- Stream URL -->
            <div class="flex items-center text-sm font-medium text-slate-600">
                <div class="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                    <i class="fas fa-link text-white text-xs"></i>
                </div>
                <a :href="props.stream.streamUrl" target="_blank" class="text-blue-600 hover:text-blue-800 truncate">{{ props.stream.streamUrl }}</a>
            </div>
        </div>

        <!-- Restart button -->
        <div class="w-full mt-6">
            <Button text="Restart Stream" type="primary" icon="fas fa-redo" class="w-full" @click="restartStream" />
        </div>
    </Card>
</template>