<template>
  <div class="bg-white rounded-xl overflow-hidden h-full flex flex-col border border-[#E2E8F0]" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
      :row-key="(row: Task) => row.id"
      :scroll-x="1100"
      flex-height
      style="flex: 1;"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { DataTableColumns, NTag, NButton, NSpace } from 'naive-ui'

export interface Task {
  id: string
  taskId: string
  name: string
  algorithm: string
  deviceCount: number
  priority: 'high' | 'medium' | 'low'
  priorityText: string
  status: 'enabled' | 'disabled'
  statusText: string
  creator: string
  createTime: string
}

interface Props {
  data: Task[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'view', id: string): void
  (e: 'toggle', id: string): void
}>()

const getPriorityColor = (priority: Task['priority']) => {
  const colors: Record<Task['priority'], { color: string; textColor: string }> = {
    high: { color: '#FEF2F2', textColor: '#DC2626' },
    medium: { color: '#FFFBEB', textColor: '#D97706' },
    low: { color: '#F0FDF4', textColor: '#16A34A' }
  }
  return colors[priority]
}

const getStatusColor = (status: Task['status']) => {
  const colors: Record<Task['status'], { color: string; textColor: string }> = {
    enabled: { color: '#ECFDF5', textColor: '#059669' },
    disabled: { color: '#F1F5F9', textColor: '#64748B' }
  }
  return colors[status]
}

const columns: DataTableColumns<Task> = [
  {
    type: 'selection',
    width: 50,
    fixed: 'left'
  },
  {
    title: '序号',
    key: 'index',
    width: 70,
    fixed: 'left',
    render: (row, index) => index + 1
  },
  {
    title: '任务ID',
    key: 'taskId',
    width: 100,
    render: (row) => h('span', { style: { fontFamily: 'Fira Code, monospace', fontSize: '12px' } }, row.taskId)
  },
  {
    title: '任务名称',
    key: 'name',
    width: 150,
    ellipsis: { tooltip: true }
  },
  {
    title: '关联算法',
    key: 'algorithm',
    width: 120
  },
  {
    title: '关联设备数',
    key: 'deviceCount',
    width: 100,
    render: (row) => h('span', { style: { fontFamily: 'Fira Code, monospace' } }, row.deviceCount)
  },
  {
    title: '优先级',
    key: 'priority',
    width: 90,
    render: (row) => {
      const color = getPriorityColor(row.priority)
      return h(NTag, {
        color: color,
        size: 'small',
        bordered: false
      }, () => row.priorityText)
    }
  },
  {
    title: '运行状态',
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
    title: '创建人',
    key: 'creator',
    width: 100
  },
  {
    title: '创建时间',
    key: 'createTime',
    width: 180
  },
  {
    title: '操作',
    key: 'actions',
    width: 180,
    fixed: 'right',
    render: (row) => {
      return h(NSpace, { size: 12 }, () => [
        h(NButton, {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => emit('view', row.id)
        }, () => '详情'),
        h(NButton, {
          text: true,
          type: 'primary',
          size: 'small',
          onClick: () => emit('edit', row.id)
        }, () => '编辑'),
        h(NButton, {
          text: true,
          type: row.status === 'enabled' ? 'warning' : 'success',
          size: 'small',
          onClick: () => emit('toggle', row.id)
        }, () => row.status === 'enabled' ? '停用' : '启用')
      ])
    }
  }
]
</script>
