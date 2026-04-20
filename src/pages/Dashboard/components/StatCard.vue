<template>
  <div class="stat-card bg-white p-5 flex items-center gap-4 cursor-pointer group border border-gray-100">
    <div
      class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
      :style="{ backgroundColor: iconBgColor }"
    >
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" :stroke="iconColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        </svg>
      </slot>
    </div>
    <div class="min-w-0">
      <div class="text-2xl font-semibold text-gray-800 font-mono leading-tight tracking-tight">{{ displayValue }}</div>
      <div class="text-sm text-gray-500 mt-0.5 font-medium">{{ title }}</div>
    </div>
    <!-- 右侧装饰 -->
    <div class="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
        <path d="m9 18 6-6-6-6"/>
      </svg>
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
  return props.iconColor + '12'
})
</script>

<style scoped>
.stat-card {
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08), 0 4px 8px rgba(15, 23, 42, 0.04);
  border-color: rgba(37, 99, 235, 0.2);
}
.stat-card:active {
  transform: translateY(0);
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);
}
</style>
