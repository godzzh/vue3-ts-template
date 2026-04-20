<template>
  <div class="bg-white rounded-xl overflow-hidden h-full flex flex-col border border-gray-100" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
      :row-key="(row: Alarm) => row.id"
      :scroll-x="760"
      flex-height
      style="flex: 1;"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { DataTableColumns, NTag, NButton } from 'naive-ui'
import VImage from '@/common/VImage/index.vue'

export interface Alarm {
  id: number
  image: string
  location: string
  time: string
  type: 'fighting' | 'fall' | 'fire' | 'intrusion' | 'helmet'
  typeName: string
  status: 'handled' | 'pending' | 'processing'
  statusText: string
}

interface Props {
  data: Alarm[]
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    onUpdatePage: (page: number) => void
  }
}

const props = withDefaults(defineProps<Props>(), {
  pagination: () => ({
    page: 1,
    pageSize: 10,
    pageCount: 1,
    onUpdatePage: () => {}
  })
})

const emit = defineEmits<{
  (e: 'view-detail', id: number): void
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

const columns: DataTableColumns<Alarm> = [
  {
    type: 'selection',
    width: 50
  },
  {
    title: '告警图片',
    key: 'image',
    width: 100,
    render: (row) => {
      return h(VImage, {
        src: row.image,
        width: 60,
        height: 40,
        style: { borderRadius: '6px' }
      })
    }
  },
  {
    title: '告警位置',
    key: 'location',
    width: 150
  },
  {
    title: '告警时间',
    key: 'time',
    width: 180
  },
  {
    title: '告警类型',
    key: 'type',
    width: 120,
    render: (row) => {
      const color = getTypeColor(row.type)
      return h(NTag, {
        color: color,
        size: 'small',
        round: true
      }, () => row.typeName)
    }
  },
  {
    title: '告警状态',
    key: 'status',
    width: 100,
    render: (row) => {
      const color = getStatusColor(row.status)
      return h(NTag, {
        color: color,
        size: 'small',
        bordered: false
      }, () => row.statusText)
    }
  },
  {
    title: '操作',
    key: 'actions',
    width: '60px',
    render: (row) => {
      return h(NButton, {
        text: true,
        type: 'primary',
        size: 'small',
        onClick: () => emit('view-detail', row.id)
      }, () => '详情')
    }
  }
]
</script>

