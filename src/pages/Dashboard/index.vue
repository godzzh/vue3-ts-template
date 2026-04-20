<template>
  <div class="p-6 min-h-[calc(100vh-60px)]" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <!-- 页面标题区 -->
    <div class="mb-6 flex items-center gap-4">
      <div class="w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-400 rounded-full"></div>
      <div>
        <h1 class="text-[24px] font-semibold text-slate-800 tracking-tight font-sans">仪表盘</h1>
        <p class="text-sm text-slate-500 mt-0.5 tracking-wide">实时监控系统运行状态</p>
      </div>
    </div>

    <!-- 骨架屏加载 -->
    <template v-if="loading">
      <!-- 统计卡片区 -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-white rounded-xl p-5 border border-gray-100 skeleton"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-gray-200"></div>
            <div class="flex-1">
              <div class="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div class="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- 实时监控区 -->
      <div class="bg-white rounded-xl p-5 mb-5 border border-gray-100">
        <div class="grid grid-cols-3 gap-3">
          <div v-for="i in 6" :key="i" class="aspect-video bg-gray-100 rounded-lg skeleton"></div>
        </div>
      </div>

      <!-- 告警列表 + 处置饼图 -->
      <div class="grid grid-cols-[1fr_300px] gap-4">
        <div class="h-[320px] bg-gray-100 rounded-xl skeleton border border-gray-100"></div>
        <div class="h-[320px] bg-gray-100 rounded-xl skeleton border border-gray-100"></div>
      </div>
    </template>

    <!-- 真实内容 -->
    <template v-else>
      <!-- 统计卡片区 -->
      <div class="grid grid-cols-4 gap-4 mb-5">
        <StatCard
          v-for="(card, index) in statCards"
          :key="card.title"
          :title="card.title"
          :value="card.value"
          :icon-color="card.iconColor"
          :growth="card.growth"
          :style="{ animationDelay: `${index * 80}ms` }"
          class="animate-fade-in-up opacity-0"
        >
          <template #icon>
            <component :is="card.icon" />
          </template>
        </StatCard>
      </div>

      <!-- 实时监控区 -->
      <div class="mb-5 animate-fade-in-up opacity-0" style="animation-delay: 320ms;">
        <VideoGrid />
      </div>

      <!-- 告警列表 + 处置饼图 -->
      <div class="grid grid-cols-[1fr_300px] gap-4">
        <div class="animate-fade-in-up opacity-0" style="animation-delay: 400ms;">
          <AlertList />
        </div>
        <div class="animate-fade-in-up opacity-0" style="animation-delay: 480ms;">
          <DisposalChart />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, h, onMounted } from 'vue'
import StatCard from './components/StatCard.vue'
import VideoGrid from './components/VideoGrid.vue'
import AlertList from './components/AlertList.vue'
import DisposalChart from './components/DisposalChart.vue'

// 加载状态
const loading = ref(true)

// 统计卡片数据
const statCards = [
  {
    title: '接入设备',
    value: 999,
    iconColor: '#2563EB',
    growth: 12,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#2563EB',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('rect', { x: '2', y: '2', width: '20', height: '8', rx: '2', ry: '2' }),
      h('rect', { x: '2', y: '14', width: '20', height: '8', rx: '2', ry: '2' }),
      h('line', { x1: '6', y1: '6', x2: '6.01', y2: '6' }),
      h('line', { x1: '6', y1: '18', x2: '6.01', y2: '18' })
    ])
  },
  {
    title: '告警总数',
    value: 100,
    iconColor: '#F59E0B',
    growth: -5,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#F59E0B',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
      h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
      h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
    ])
  },
  {
    title: '预警场景',
    value: 99,
    iconColor: '#EF4444',
    growth: 8,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#EF4444',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('circle', { cx: '12', cy: '12', r: '10' }),
      h('line', { x1: '12', y1: '8', x2: '12', y2: '12' }),
      h('line', { x1: '12', y1: '16', x2: '12.01', y2: '16' })
    ])
  },
  {
    title: '算法总数',
    value: 12,
    iconColor: '#10B981',
    growth: 0,
    icon: () => h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: '#10B981',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('polyline', { points: '16 18 22 12 16 6' }),
      h('polyline', { points: '8 6 2 12 8 18' })
    ])
  }
]

// 模拟加载
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 800)
})
</script>

<style scoped>
/* 使用全局定义的动画 - 无需额外样式 */
</style>
