<script setup>
import AOS from 'aos';
import { onMounted } from 'vue';
import { useGlobalStore } from '~/composables/stores/useGlobalStore.js';
import MessageDialog from '~/components/ui/MessageDialog.vue';
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue';
import MessageToast from '~/components/ui/MessageToast.vue';

const globalStore = useGlobalStore();

// On component mounted
onMounted(() => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true
    });
});
</script>

<template>
    <div>
        <NuxtLayout />
    </div>

    <!-- Message dialog -->
    <MessageDialog :visible="globalStore.dialog.visible"
        :type="globalStore.dialog.type"
        :title="globalStore.dialog.title"
        :message="globalStore.dialog.message"
        @update:visible="globalStore.dialog.visible = $event" />
    
    <!-- Confirm dialog -->
    <ConfirmDialog :visible="globalStore.confirmDialog.visible"
        :title="globalStore.confirmDialog.title"
        :icon="globalStore.confirmDialog.icon"
        :message="globalStore.confirmDialog.message"
        :themeColor="globalStore.confirmDialog.themeColor"
        :confirmButton="globalStore.confirmDialog.confirmButton"
        :cancelButton="globalStore.confirmDialog.cancelButton"
        @confirm="globalStore.confirmDialog.onConfirm"
        @cancel="globalStore.confirmDialog.onCancel"
        @update:visible="globalStore.confirmDialog.visible = $event" />

    <!-- Message toast -->
    <MessageToast :visible="globalStore.toast.visible"
        :type="globalStore.toast.type"
        :message="globalStore.toast.message"
        @update:visible="globalStore.toast.visible = $event" />
</template>