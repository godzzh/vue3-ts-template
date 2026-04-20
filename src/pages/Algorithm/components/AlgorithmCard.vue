<template>
  <div class="algorithm-card bg-white rounded-xl p-5 cursor-pointer group border border-[#E2E8F0] hover:border-primary-100 transition-all duration-300" @click="handleClick">
    <div class="flex items-start">
      <div
        class="w-14 h-14 rounded-xl flex items-center justify-center text-white mr-4 flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
        :style="{ background: iconBgColor }"
      >
        <component :is="iconComponent" />
      </div>
      <div class="flex-1 overflow-hidden">
        <div class="flex items-start">
          <div class="flex-1 overflow-hidden">
            <h3 class="text-base font-semibold text-gray-800 mb-1 tracking-tight">{{ algorithm.name }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">{{ algorithm.description }}</p>
          </div>
        </div>
        <div class="flex items-center mt-3 gap-3">
          <span class="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">v{{ algorithm.version }}</span>
          <span
            class="text-xs px-2 py-0.5 rounded font-medium transition-colors duration-200"
            :class="algorithm.status === 'active' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-500 bg-gray-100'"
          >
            {{ algorithm.status === 'active' ? '已启用' : '已停用' }}
          </span>
        </div>
        <div class="flex gap-2 mt-3 pt-3 border-t border-gray-50">
          <n-button text type="primary" size="small" class="hover:bg-primary-50 transition-colors duration-200" @click.stop="handleViewVersions">
            查看版本
          </n-button>
          <n-button text type="primary" size="small" class="hover:bg-primary-50 transition-colors duration-200" @click.stop="handleVersionManage">
            版本维护
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { NButton } from 'naive-ui'

export interface Algorithm {
  id: string
  name: string
  description: string
  icon: string
  version: string
  status: 'active' | 'inactive'
  category: string
}

interface Props {
  algorithm: Algorithm
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'view-versions', id: string): void
  (e: 'version-manage', id: string): void
  (e: 'click', id: string): void
}>()

const iconBgColor = computed(() => {
  const colorMap: Record<string, string> = {
    intrusion: '#EF4444',
    fire: '#F97316',
    crowd: '#6366F1',
    fighting: '#DC2626',
    fall: '#F59E0B',
    helmet: '#10B981'
  }
  return colorMap[props.algorithm.icon] || '#2563EB'
})

const iconComponent = computed(() => {
  const icons: Record<string, any> = {
    intrusion: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
    ]),
    fire: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z' })
    ]),
    crowd: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '9', cy: '7', r: '4' }),
      h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
      h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
    ]),
    fighting: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M12 2v4' }),
      h('path', { d: 'M6.34 7.34l2.83 2.83' }),
      h('path', { d: 'M2 12h4' }),
      h('path', { d: 'M6.34 16.66l2.83-2.83' }),
      h('path', { d: 'M12 18v4' }),
      h('path', { d: 'M17.66 16.66l-2.83-2.83' }),
      h('path', { d: 'M22 12h-4' }),
      h('path', { d: 'M17.66 7.34l-2.83 2.83' })
    ]),
    fall: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '5', r: '2' }),
      h('path', { d: 'M12 7v5' }),
      h('path', { d: 'M7 17l-2 4' }),
      h('path', { d: 'M17 17l2 4' }),
      h('path', { d: 'M7 12h10' })
    ]),
    helmet: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '28',
      height: '28',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z' }),
      h('path', { d: 'M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5' }),
      h('path', { d: 'M4 15v-3a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v3' })
    ])
  }
  return icons[props.algorithm.icon] || icons.intrusion
})

const handleClick = () => {
  emit('click', props.algorithm.id)
}

const handleViewVersions = () => {
  emit('view-versions', props.algorithm.id)
}

const handleVersionManage = () => {
  emit('version-manage', props.algorithm.id)
}
</script>

<style scoped>
.algorithm-card {
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(15, 23, 42, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.algorithm-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1), 0 4px 8px rgba(15, 23, 42, 0.04);
}
.algorithm-card:active {
  transform: translateY(-1px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
