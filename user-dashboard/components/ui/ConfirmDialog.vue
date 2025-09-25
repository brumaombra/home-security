<script setup>
import { getAvailableColors, getBackgroundGradient } from '~/composables/useGradientColors.js';
import Button from '~/components/ui/Button.vue';
import Dialog from '~/components/ui/Dialog.vue';
import GradientIcon from '~/components/ui/GradientIcon.vue';

// Props
const props = defineProps({
    visible: { type: Boolean, required: false },
    title: { type: String, default: 'Confirmation' },
    icon: { type: String, default: 'fa-solid fa-question' },
    message: { type: String, default: 'Are you sure?' },
    themeColor: { type: String, default: 'blue-purple', validator: value => getAvailableColors().includes(value) },
    confirmButton: { type: Object, default: () => ({ type: 'primary', text: 'Confirm', icon: 'fa-solid fa-check' }) },
    cancelButton: { type: Object, default: () => ({ type: 'secondary', text: 'Cancel', icon: 'fa-solid fa-times' }) }
});

// Emits
const emits = defineEmits(['confirm', 'cancel', 'update:visible']);

// Handle cancel press
const handleCancelPress = () => {
    emits('cancel');
    emits('update:visible', false);
};

// Handle confirm press
const handleConfirmPress = () => {
    emits('confirm');
    emits('update:visible', false);
};
</script>

<template>
    <Dialog :visible="props.visible" :themeColor="props.themeColor">
        <!-- Body -->
        <template #body>
            <!-- Icon and title -->
            <div class="flex items-center justify-start mb-4">
                <GradientIcon v-if="props.icon" :icon="props.icon" size="base" :color="props.themeColor" class="me-3 flex-shrink-0" />
                <h3 :class="['text-lg md:text-xl font-black flex-1 bg-clip-text text-transparent bg-gradient-to-br', getBackgroundGradient(props.themeColor)]">{{ props.title }}</h3>
            </div>

            <!-- Message -->
            <p class="text-sm md:text-base font-semibold text-gray-500">{{ props.message }}</p>
        </template>

        <!-- Footer -->
        <template #footer>
            <Button :type="props.cancelButton.type" :text="props.cancelButton.text" :icon="props.cancelButton.icon" @click="handleCancelPress" />
            <Button :type="props.confirmButton.type" :text="props.confirmButton.text" :icon="props.confirmButton.icon" :color="props.themeColor" @click="handleConfirmPress" />
        </template>
    </Dialog>
</template>