<template>
  <div class="bg-white rounded-xl p-5 h-full flex flex-col overflow-hidden border border-gray-100" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <span class="text-base font-semibold text-gray-800">最新告警</span>
        <span class="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-medium rounded-full">{{ alerts.length }}条</span>
      </div>
      <n-button text type="primary" size="small" class="hover:bg-primary-50 transition-colors duration-200">查看更多</n-button>
    </div>
    <n-scrollbar>
      <div class="flex flex-col gap-2 pr-2">
        <div
          v-for="alert in alerts"
          :key="alert.id"
          class="flex items-center gap-3 p-3 rounded-lg border border-gray-50 hover:border-gray-100 hover:bg-gray-50/50 transition-all duration-200 cursor-pointer group"
        >
          <div class="flex-shrink-0">
            <n-tag :color="getAlertColor(alert.type)" size="small" round>
              {{ alert.typeName }}
            </n-tag>
          </div>
          <div class="flex-1 min-w-0 flex flex-col gap-0.5">
            <span class="text-sm text-gray-800 font-medium truncate group-hover:text-primary-500 transition-colors duration-200">{{ alert.location }}</span>
            <span class="text-xs text-gray-400">{{ alert.time }}</span>
          </div>
          <div class="flex-shrink-0">
            <n-tag :color="getStatusColor(alert.status)" size="small">
              {{ alert.statusText }}
            </n-tag>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { NTag, NButton, NScrollbar } from 'naive-ui'

interface Alert {
  id: number
  type: 'fighting' | 'fall' | 'fire' | 'intrusion' | 'helmet'
  typeName: string
  location: string
  time: string
  status: 'handled' | 'pending' | 'processing'
  statusText: string
}

const props = withDefaults(defineProps<{
  alerts?: Alert[]
}>(), {
  alerts: () => [
    { id: 1, type: 'fighting', typeName: '打架斗殴', location: '软件园C3栋', time: '12:00', status: 'handled', statusText: '已处置' },
    { id: 2, type: 'fall', typeName: '人员摔倒', location: '软件园C3栋', time: '12:05', status: 'pending', statusText: '未处置' },
    { id: 3, type: 'fire', typeName: '着火预警', location: '软件园C3栋', time: '12:10', status: 'processing', statusText: '处理中' },
    { id: 4, type: 'intrusion', typeName: '入侵检测', location: '软件园C3栋', time: '12:15', status: 'pending', statusText: '未处置' },
    { id: 5, type: 'helmet', typeName: '未戴安全帽', location: '软件园C3栋', time: '12:20', status: 'handled', statusText: '已处置' }
  ]
})

const getAlertColor = (type: Alert['type']) => {
  const colors: Record<Alert['type'], { color: string; textColor: string }> = {
    fighting: { color: '#FEF2F2', textColor: '#EF4444' },
    fall: { color: '#FFFBEB', textColor: '#F59E0B' },
    fire: { color: '#FFF7ED', textColor: '#F97316' },
    intrusion: { color: '#FEF2F2', textColor: '#DC2626' },
    helmet: { color: '#EEF2FF', textColor: '#6366F1' }
  }
  return colors[type] || { color: '#F1F5F9', textColor: '#6366F1' }
}

const getStatusColor = (status: Alert['status']) => {
  const colors: Record<Alert['status'], { color: string; textColor: string }> = {
    handled: { color: '#ECFDF5', textColor: '#059669' },
    pending: { color: '#FEF2F2', textColor: '#DC2626' },
    processing: { color: '#FFFBEB', textColor: '#D97706' }
  }
  return colors[status] || { color: '#F1F5F9', textColor: '#64748B' }
}
</script>
