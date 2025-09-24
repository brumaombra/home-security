import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

// Set the busy state of the app
export const setBusy = busy => {
    const globalStore = useGlobalStore();
    if (globalStore.value.busy === busy) return; // Exit if it's already equal
    globalStore.value.busy = busy;
};

// Create the images URL
export const getImageUrl = filename => {
    const runtimeConfig = useRuntimeConfig();
    const baseUrl = runtimeConfig.public.videoServiceBaseUrl;
    return `${baseUrl}/images/${filename}`;
};