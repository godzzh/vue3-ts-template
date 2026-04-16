<template>
  <div class="stat-card bg-gray-150 rounded-2xl p-6 shadow-neu flex items-center gap-4 cursor-pointer">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-neu-sm" :style="{ background: iconBgColor }">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        </svg>
      </slot>
    </div>
    <div class="min-w-0">
      <div class="text-3xl font-semibold text-gray-700 font-mono leading-tight">{{ displayValue }}</div>
      <div class="text-sm text-gray-500 mt-1">{{ title }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  value: number | string
  iconColor?: string
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: '#2563EB',
  hoverable: true
})

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toLocaleString()
  }
  return props.value
})

const iconBgColor = computed(() => {
  return props.iconColor + '15'
})
</script>

<style scoped>
.stat-card {
  transition: all 0.3s ease;
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 8px 8px 16px #d1d5db, -8px -8px 16px #ffffff;
}
.stat-card:active {
  transform: translateY(0);
  box-shadow: inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff;
}
</style>
