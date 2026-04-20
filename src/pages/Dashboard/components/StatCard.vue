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
    <div class="min-w-0 flex-1">
      <div class="flex items-baseline gap-2">
        <div class="text-2xl font-semibold text-gray-800 font-mono leading-tight tracking-tight">{{ displayValue }}</div>
        <!-- 增长率 -->
        <div
          v-if="growth !== 0"
          class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-xs font-medium"
          :style="{ color: trendColor, backgroundColor: trendBgColor }"
        >
          <svg
            v-if="trend === 'positive'"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            :stroke="trendColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          <svg
            v-else-if="trend === 'negative'"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            :stroke="trendColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          <span>{{ growthText }}</span>
        </div>
      </div>
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
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  title: string
  value: number | string
  iconColor?: string
  hoverable?: boolean
  growth?: number // 增长率，正数表示上升，负数表示下降
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: '#2563EB',
  hoverable: true,
  growth: 0
})

const animatingValue = ref(0)
const animationDuration = 1500

const targetValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value
  }
  return parseInt(props.value) || 0
})

const displayValue = computed(() => {
  return animatingValue.value.toLocaleString()
})

// 数字动画
const animateValue = () => {
  const startTime = performance.now()
  const startValue = 0
  const endValue = targetValue.value

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / animationDuration, 1)
    // 使用 easeOutExpo 缓动
    const easeProgress = 1 - Math.pow(1 - progress, 6)
    animatingValue.value = Math.round(startValue + (endValue - startValue) * easeProgress)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  if (typeof props.value === 'number') {
    animateValue()
  }
})

watch(() => props.value, () => {
  if (typeof props.value === 'number') {
    animatingValue.value = 0
    animateValue()
  }
})

const iconBgColor = computed(() => {
  return props.iconColor + '12'
})

// 判断趋势：positive（上升）、negative（下降）、neutral（无变化）
const trend = computed(() => {
  if (props.growth > 0) return 'positive'
  if (props.growth < 0) return 'negative'
  return 'neutral'
})

const growthText = computed(() => {
  if (props.growth === 0) return '持平'
  const sign = props.growth > 0 ? '+' : ''
  return `${sign}${props.growth}%`
})

const trendColor = computed(() => {
  if (trend.value === 'positive') return '#10B981'
  if (trend.value === 'negative') return '#EF4444'
  return '#6B7280'
})

const trendBgColor = computed(() => {
  if (trend.value === 'positive') return 'rgba(16, 185, 129, 0.1)'
  if (trend.value === 'negative') return 'rgba(239, 68, 68, 0.1)'
  return 'rgba(107, 114, 128, 0.1)'
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
