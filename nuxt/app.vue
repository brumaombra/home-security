<script setup>
import AOS from 'aos';
import { onMounted } from 'vue';

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
</template>