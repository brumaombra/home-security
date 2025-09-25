<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 mb-3 flex justify-between items-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <div class="flex flex-col">
      <div class="font-semibold text-gray-900 text-lg capitalize">{{ detection.class }}</div>
      <div class="text-sm text-gray-600 mt-1">
        Position: ({{ detection.bbox.x }}, {{ detection.bbox.y }}) •
        Size: {{ detection.bbox.width }}×{{ detection.bbox.height }}
      </div>
    </div>
    <div class="flex items-center">
      <div class="w-24 h-2 bg-gray-200 rounded mr-3">
        <div class="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded transition-all duration-500" :style="{ width: confidence + '%' }"></div>
      </div>
      <div class="font-semibold text-blue-600">{{ confidence }}%</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  detection: Object
})

const confidence = computed(() => Math.round(props.detection.score * 100))
</script>