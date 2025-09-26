<script setup>
import { ref } from 'vue';
import Dialog from '~/components/ui/Dialog.vue';
import Button from '~/components/ui/Button.vue';
import Label from '~/components/ui/Label.vue';
import Input from '~/components/ui/Input.vue';
import { showMessageToast, callVideoService } from '~/composables/useUtils.js';

// Props
const props = defineProps({
    visible: { type: Boolean, default: false }
});

// Emits
const emit = defineEmits(['update:visible', 'stream-added']);

// Reactive data
const newStreamUrl = ref('');
const addingStream = ref(false);

// Add new stream
const addStream = async () => {
    // Validate input
    if (!newStreamUrl.value.trim()) {
        showMessageToast({ message: 'Please enter a stream URL', type: 'error' });
        return;
    }

    try {
        // Call the API to add the stream
        addingStream.value = true;
        await callVideoService('/api/streams', {
            method: 'POST',
            body: { streamUrl: newStreamUrl.value.trim() }
        });

        // Reset state and notify parent
        newStreamUrl.value = '';
        emit('update:visible', false);
        emit('stream-added');
        showMessageToast({ message: 'Stream added successfully', type: 'success' });
    } catch (error) {
        showMessageToast({ message: `Error adding stream: ${error.message}`, type: 'error' });
    } finally {
        addingStream.value = false;
    }
};

// Handle cancel
const handleCancel = () => {
    newStreamUrl.value = '';
    emit('update:visible', false);
};
</script>

<template>
    <Dialog :visible="props.visible" themeColor="blue" size="sm">
        <!-- Body -->
        <template #body>
            <div class="text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-4">Add New Stream</h3>
                <div class="space-y-3">
                    <Label text="Stream URL" for="streamUrl" />
                    <Input id="streamUrl" v-model="newStreamUrl" type="url" placeholder="rtsp://example.com/stream" @keyup.enter="addStream" />
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <Button text="Cancel" type="secondary" @click="handleCancel" />
            <Button text="Add Stream" type="primary" :disabled="addingStream" :icon="addingStream ? 'fas fa-spinner fa-spin' : 'fas fa-plus'" @click="addStream" />
        </template>
    </Dialog>
</template>