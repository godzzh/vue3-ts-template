<template>
  <VModal
    :show="visible"
    :title="alarm?.typeName + ' - 告警详情'"
    @update:show="visible = $event"
    @close="handleClose"
  >
    <div v-if="alarm" class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm text-gray-500 flex-shrink-0">告警位置</span>
        <span class="text-sm text-gray-800">{{ alarm.location }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm text-gray-500 flex-shrink-0">告警时间</span>
        <span class="text-sm text-gray-800">{{ alarm.time }}</span>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm text-gray-500 flex-shrink-0">告警类型</span>
        <n-tag :color="getTypeColor(alarm.type)" size="small" round>
          {{ alarm.typeName }}
        </n-tag>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-20 text-sm text-gray-500 flex-shrink-0">处理状态</span>
        <n-tag :color="getStatusColor(alarm.status)" size="small">
          {{ alarm.statusText }}
        </n-tag>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-gray-500">告警图片</span>
        <div class="rounded-lg overflow-hidden bg-gray-50">
          <VImage :src="alarm.image" :alt="alarm.typeName" width="100%" />
        </div>
      </div>
    </div>
    <template #footer>
      <n-button @click="handleClose">关闭</n-button>
      <n-button v-if="alarm?.status === 'pending'" type="primary" @click="handleDispose">
        立即处置
      </n-button>
    </template>
  </VModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NTag, NButton } from 'naive-ui'
import VModal from '@/common/VModal/index.vue'
import VImage from '@/common/VImage/index.vue'
import type { Alarm } from './AlarmTable.vue'

const visible = ref(false)
const alarm = ref<Alarm | null>(null)

const open = (targetAlarm: Alarm) => {
  alarm.value = targetAlarm
  visible.value = true
}

const handleClose = () => {
  visible.value = false
}

const handleDispose = () => {
  if (alarm.value) {
    emit('dispose', alarm.value.id)
  }
}

const emit = defineEmits<{
  (e: 'dispose', id: number): void
}>()

const getTypeColor = (type: Alarm['type']) => {
  const colors: Record<Alarm['type'], { color: string; textColor: string }> = {
    fighting: { color: '#FEF2F2', textColor: '#EF4444' },
    fall: { color: '#FFFBEB', textColor: '#F59E0B' },
    fire: { color: '#FFF7ED', textColor: '#F97316' },
    intrusion: { color: '#FEF2F2', textColor: '#DC2626' },
    helmet: { color: '#EEF2FF', textColor: '#6366F1' }
  }
  return colors[type] || { color: '#F1F5F9', textColor: '#6366F1' }
}

const getStatusColor = (status: Alarm['status']) => {
  const colors: Record<Alarm['status'], { color: string; textColor: string }> = {
    handled: { color: '#ECFDF5', textColor: '#059669' },
    pending: { color: '#FEF2F2', textColor: '#DC2626' },
    processing: { color: '#FFFBEB', textColor: '#D97706' }
  }
  return colors[status] || { color: '#F1F5F9', textColor: '#64748B' }
}

defineExpose({ open })
</script>
