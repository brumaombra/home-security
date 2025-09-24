<script setup>
import Button from '~/components/ui/Button.vue';

// Props
const props = defineProps({
    busy: { type: Boolean, default: false },
    text: { type: String, default: 'Load More' },
    loadingText: { type: String, default: 'Loading...' }
});

// Emits
const emit = defineEmits(['loadMore']);

// Handle load more
const loadMore = () => {
    emit('loadMore');
};
</script>

<template>
    <div class="flex justify-center">
        <!-- Loading state button -->
        <Button v-if="props.busy" type="secondary" :text="props.loadingText" icon="fa-solid fa-spinner fa-spin" :disabled="true" class="w-full md:w-auto" />

        <!-- Load more button -->
        <Button v-else type="secondary" :text="props.text" icon="fa-solid fa-chevron-down" @click="loadMore" class="w-full md:w-auto" />
    </div>
</template>