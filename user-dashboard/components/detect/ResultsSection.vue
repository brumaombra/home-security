<template>
  <div v-if="results" class="mt-8">
    <div class="bg-gray-50 p-6 rounded-lg mb-5">
      <h3 class="text-gray-900 mb-1 text-xl font-medium">Detection Results</h3>
      <div class="text-blue-600 font-semibold text-lg">Found {{ results.detections.length }} objects</div>
    </div>
    <div>
      <DetectionItem
        v-for="(detection, index) in results.detections"
        :key="index"
        :detection="detection"
      />
    </div>
  </div>
</template>

<script setup>
import DetectionItem from './DetectionItem.vue'

defineProps({
  results: Object
})
</script>