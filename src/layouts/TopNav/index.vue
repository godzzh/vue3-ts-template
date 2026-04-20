<template>
  <header class="h-[60px] bg-white/95 backdrop-blur-md flex items-center sticky top-0 z-50 border-b border-gray-200/60" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.03);">
    <!-- Logo 区域 -->
    <div class="w-[200px] px-6 flex items-center flex-shrink-0">
      <span class="text-lg font-semibold gradient-text">AI视频推理平台</span>
    </div>

    <!-- 导航菜单 -->
    <nav class="flex-1 flex items-center h-full">
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="h-full px-5 flex items-center gap-2 text-sm font-medium transition-all duration-200 relative group"
        :class="isActive(item.path) ? 'text-primary-500' : 'text-gray-500 hover:text-gray-800'"
      >
        <component :is="item.icon" class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
        <span>{{ item.label }}</span>
        <!-- 激活指示器 - 高级感滑块效果 -->
        <span
          v-if="isActive(item.path)"
          class="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-primary rounded-full"
        ></span>
        <!-- 悬停下划线 -->
        <span
          v-else
          class="absolute bottom-0 left-3 right-3 h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"
        ></span>
      </router-link>
    </nav>

    <!-- 右侧操作区 -->
    <div class="flex items-center gap-2 px-6">
      <n-badge :value="notificationCount" :max="99" type="error">
        <n-button quaternary circle @click="handleNotification" class="hover:bg-gray-100/80 transition-colors duration-200">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
            </svg>
          </template>
        </n-button>
      </n-badge>

      <div class="w-px h-6 bg-gray-200/60 mx-1"></div>

      <UserMenu />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import { useRoute } from 'vue-router'
import { NBadge, NButton } from 'naive-ui'
import UserMenu from './components/UserMenu.vue'

const route = useRoute()
const notificationCount = ref(5)

interface MenuItem {
  path: string
  label: string
  icon: any
}

const HomeIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('path', { d: 'm3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' }),
  h('polyline', { points: '9 22 9 12 15 12 15 22' })
])

const AlarmIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('path', { d: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' }),
  h('line', { x1: '12', y1: '9', x2: '12', y2: '13' }),
  h('line', { x1: '12', y1: '17', x2: '12.01', y2: '17' })
])

const TaskIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }),
  h('rect', { x: '8', y: '2', width: '8', height: '4', rx: '1', ry: '1' })
])

const AlgorithmIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('polyline', { points: '16 18 22 12 16 6' }),
  h('polyline', { points: '8 6 2 12 8 18' })
])

const DeviceIcon = () => h('svg', {
  xmlns: 'http://www.w3.org/2000/svg',
  width: '20',
  height: '20',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round'
}, [
  h('rect', { x: '2', y: '2', width: '20', height: '8', rx: '2', ry: '2' }),
  h('rect', { x: '2', y: '14', width: '20', height: '8', rx: '2', ry: '2' }),
  h('line', { x1: '6', y1: '6', x2: '6.01', y2: '6' }),
  h('line', { x1: '6', y1: '18', x2: '6.01', y2: '18' })
])

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: '首页', icon: HomeIcon },
  { path: '/alarm', label: '告警中心', icon: AlarmIcon },
  { path: '/task', label: '任务中心', icon: TaskIcon },
  { path: '/algorithm', label: '算法中心', icon: AlgorithmIcon },
  { path: '/device', label: '设备中心', icon: DeviceIcon }
]

const isActive = (path: string) => {
  return route.path === path || (path === '/dashboard' && route.path === '/')
}

const handleNotification = () => {
  console.log('打开通知中心')
}
</script>
