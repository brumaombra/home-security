<script setup>
// Props
const props = defineProps({
    modelValue: { type: [String, Number], default: '' },
    id: { type: String, default: '' },
    type: { type: String, default: 'text', validator: value => ['text', 'email', 'password', 'number', 'url', 'date', 'tel'].includes(value) },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    maxlength: { type: Number, default: null }
});

// Emits
const emit = defineEmits(['update:modelValue', 'submit']);

// Handle input
const handleInput = event => {
    emit('update:modelValue', event.target.value);
};

// Handle submit if input is inside a form
const handleSubmit = event => {
    emit('submit', event);
};
</script>

<template>
    <input :id="props.id"
        :type="props.type"
        :value="props.modelValue"
        @input="handleInput"
        @submit="handleSubmit"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :maxlength="props.maxlength"
        :placeholder="props.placeholder"
        class="w-full py-3.5 pl-4 pr-4 text-sm font-medium bg-white text-gray-600 border-2 border-gray-100 h-[52px] rounded-xl appearance-none transition-all duration-200 outline-none hover:border-gray-200 focus:border-blue-500 focus:outline-none" />
</template>