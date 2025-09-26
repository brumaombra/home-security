import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';

// Set the busy state of the app
export const setBusy = busy => {
    const globalStore = useGlobalStore();
    if (globalStore.value.busy === busy) return; // Exit if it's already equal
    globalStore.value.busy = busy;
};

// Call the video service API
export const callVideoService = async (url, options = {}) => {
    const runtimeConfig = useRuntimeConfig();
    const videoServiceUrl = runtimeConfig.public.videoServiceUrl;
    const videoServicePort = runtimeConfig.public.videoServicePort;
    const fullUrl = `${videoServiceUrl}:${videoServicePort}${url}`;
    return await $fetch(fullUrl, options);
};

// Create the images URL
export const getImageUrl = filename => {
    const runtimeConfig = useRuntimeConfig();
    const videoServicePort = runtimeConfig.public.videoServicePort;
    const currentUrl = window.location.origin; // Get current URL origin
    const url = new URL(currentUrl);
    url.port = videoServicePort; // Change to video service port
    return `${url.origin}/images/${filename}`;
};

// Show the message toast
export const showMessageToast = ({ message, type, time = 5000 }) => {
    const globalStore = useGlobalStore();
    globalStore.value.toast.message = message;
    globalStore.value.toast.type = type;
    globalStore.value.toast.visible = true;
    setTimeout(() => { // Hide the toast after specified time
        globalStore.value.toast.visible = false;
    }, time);
};

// Show the message dialog
export const showMessageDialog = ({ message, type, title }) => {
    const globalStore = useGlobalStore();
    globalStore.value.dialog.title = title;
    globalStore.value.dialog.message = message;
    globalStore.value.dialog.type = type;
    globalStore.value.dialog.visible = true;
};

// Show the confirm dialog
export const showConfirmDialog = ({ message, title, themeColor, onConfirm, onCancel, confirmButton = {}, cancelButton = {} }) => {
    const globalStore = useGlobalStore();

    // Store the callbacks in the store
    globalStore.value.confirmDialog.onConfirm = onConfirm;
    globalStore.value.confirmDialog.onCancel = onCancel;

    // Set the dialog properties
    globalStore.value.confirmDialog.title = title;
    globalStore.value.confirmDialog.message = message;
    globalStore.value.confirmDialog.visible = true;
    globalStore.value.confirmDialog.themeColor = themeColor;

    // Set confirm button properties
    globalStore.value.confirmDialog.confirmButton = {
        type: confirmButton.type,
        text: confirmButton.text,
        icon: confirmButton.icon
    };

    // Set cancel button properties
    globalStore.value.confirmDialog.cancelButton = {
        type: cancelButton.type,
        text: cancelButton.text,
        icon: cancelButton.icon
    };
};

// Download image from base64 string
export const downloadBase64Image = (base64Image, filename = 'image.jpg') => {
    // Validation
    if (!base64Image) {
        showMessageToast({ message: 'No image available to download.', type: 'error' });
        return;
    }

    try {
        // Convert base64 to Blob
        const base64Data = base64Image.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        // Create a byte array and a Blob
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `detected_base64_${filename}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        // Show success message
        showMessageToast({ message: 'Image downloaded successfully from base64!', type: 'success' });
    } catch (error) {
        showMessageToast({ message: 'Failed to download image from base64.', type: 'error' });
    }
};