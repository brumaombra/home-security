<script setup>
import { computed } from 'vue';
import { getBackgroundGradient } from '~/composables/useGradientColors.js';
import Button from '~/components/ui/Button.vue';
import Dialog from '~/components/ui/Dialog.vue';

// Props
const props = defineProps({
    visible: { type: Boolean, required: true },
    title: { type: String, default: '' },
    type: { type: String, default: 'info', validator: value => ['error', 'success', 'info'].includes(value) },
    message: { type: String, required: true, default: '' }
});

// Emits
const emits = defineEmits(['close', 'update:visible']);

const gradientName = computed(() => getGradientColorFromMessageType(props.type));

// Get gradient color based on message type
const getGradientColorFromMessageType = type => {
    const colorMap = {
        success: 'green',
        error: 'danger',
        info: 'blue-purple'
    };

    return colorMap[type] || colorMap['info'];
};

// Title of the dialog
const dialogTitle = computed(() => {
    if (props.title) return props.title;

    // Default title based on type
    const map = {
        error: 'Error',
        success: 'Success',
        info: 'Info'
    };

    return map[props.type] || map.info;
});

// Icon classes based on message type
const iconClasses = computed(() => {
    const map = {
        error: 'fa-solid fa-circle-exclamation',
        success: 'fa-solid fa-circle-check',
        info: 'fa-solid fa-circle-info'
    };

    return map[props.type] || map.info;
});

// Handle close press
const handleClosePress = () => {
    emits('close');
    emits('update:visible', false);
};
</script>

<template>
    <Dialog :visible="props.visible" :themeColor="gradientName">
        <!-- Body -->
        <template #body>
            <div class="flex items-center gap-x-4 md:gap-x-7">
                <!-- Icons -->
                <div class="flex-shrink-0 flex justify-center items-center">
                    <i :class="['text-4xl', iconClasses, 'bg-clip-text text-transparent bg-gradient-to-br', getBackgroundGradient(gradientName)]"></i>
                </div>

                <!-- Text -->
                <div class="grow">
                    <h3 class="mb-2 text-2xl gap-3 font-bold flex items-center">
                        <i :class="['bg-clip-text text-transparent bg-gradient-to-br', iconClasses, getBackgroundGradient(gradientName)]"></i>
                        <span :class="['bg-clip-text text-transparent bg-gradient-to-br', getBackgroundGradient(gradientName)]">{{ dialogTitle }}</span>
                    </h3>
                    <p class="text-gray-600">{{ props.message }}</p>
                </div>
            </div>
        </template>

        <!-- Footer -->
        <template #footer>
            <Button type="secondary" text="Cancel" icon="fa-solid fa-times" @click="handleClosePress" />
        </template>
    </Dialog>
</template>