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