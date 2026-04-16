<template>
  <div class="p-6 bg-gray-50 min-h-[calc(100vh-60px)]">
    <!-- 骨架屏加载 -->
    <template v-if="loading">
      <!-- 统计卡片区 -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <div
          v-for="i in 4"
          :key="i"
          class="bg-white rounded-xl border border-gray-200 p-6 animate-pulse"
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
      <div class="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <div class="grid grid-cols-3 gap-3">
          <div v-for="i in 6" :key="i" class="aspect-video bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <!-- 告警列表 + 处置饼图 -->
      <div class="grid grid-cols-[1fr_300px] gap-4">
        <div class="h-[320px] bg-gray-200 rounded-xl animate-pulse"></div>
        <div class="h-[320px] bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </template>

    <!-- 真实内容 -->
    <template v-else>
      <!-- 统计卡片区 -->
      <div class="grid grid-cols-4 gap-4 mb-4">
        <StatCard
          v-for="(card, index) in statCards"
          :key="card.title"
          :title="card.title"
          :value="card.value"
          :icon-color="card.iconColor"
          :style="{ animationDelay: `${index * 100}ms` }"
          class="animate-card-in"
        >
          <template #icon>
            <component :is="card.icon" />
          </template>
        </StatCard>
      </div>

      <!-- 实时监控区 -->
      <div class="mb-4 animate-card-in" style="animation-delay: 400ms;">
        <VideoGrid />
      </div>

      <!-- 告警列表 + 处置饼图 -->
      <div class="grid grid-cols-[1fr_300px] gap-4">
        <div class="h-[320px] animate-card-in" style="animation-delay: 500ms;">
          <AlertList />
        </div>
        <div class="h-[320px] animate-card-in" style="animation-delay: 600ms;">
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
/* 卡片进入动画 */
@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-card-in {
  animation: card-in 400ms ease-out forwards;
  opacity: 0;
}
</style>
