<template>
  <div class="bg-white rounded-xl overflow-hidden h-full flex flex-col border border-gray-100" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="false"
      :bordered="false"
      :row-key="(row: Device) => row.id"
      :scroll-x="1100"
      flex-height
      style="flex: 1;"
    />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { DataTableColumns, NTag, NButton, NSpace } from 'naive-ui'

export interface Device {
  id: string
  name: string
  code: string
  type: string
  typeName: string
  location: string
  status: 'online' | 'offline' | 'error'
  statusText: string
  algorithmCount: number
  lastHeartbeat: string
}

interface Props {
  data: Device[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', id: string): void
  (e: 'delete', id: string): void
  (e: 'view', id: string): void
}>()

const getStatusColor = (status: Device['status']) => {
  const colors: Record<Device['status'], { bg: string; text: string; dot: string }> = {
    online: { bg: '#ECFDF5', text: '#059669', dot: '#10B981' },
    offline: { bg: '#F1F5F9', text: '#64748B', dot: '#94A3B8' },
    error: { bg: '#FEF2F2', text: '#DC2626', dot: '#EF4444' }
  }
  return colors[status]
}

const columns: DataTableColumns<Device> = [
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
    title: '设备名称',
    key: 'name',
    width: 150,
    ellipsis: { tooltip: true }
  },
  {
    title: '设备编码',
    key: 'code',
    width: 140,
    render: (row) => h('span', { style: { fontFamily: 'Fira Code, monospace', fontSize: '12px' } }, row.code)
  },
  {
    title: '设备类型',
    key: 'typeName',
    width: 100
  },
  {
    title: '安装位置',
    key: 'location',
    width: 180,
    ellipsis: { tooltip: true }
  },
  {
    title: '运行状态',
    key: 'status',
    width: 120,
    render: (row) => {
      const color = getStatusColor(row.status)
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }
      }, [
        h('span', {
          style: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color.dot
          }
        }),
        h('span', {
          style: {
            color: color.text,
            fontSize: '12px'
          }
        }, row.statusText)
      ])
    }
  },
  {
    title: '关联算法',
    key: 'algorithmCount',
    width: 100,
    render: (row) => h('span', {
      style: {
        fontFamily: 'Fira Code, monospace',
        color: '#2563EB'
      }
    }, row.algorithmCount + '个')
  },
  {
    title: '最后心跳',
    key: 'lastHeartbeat',
    width: 160
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
          type: 'error',
          size: 'small',
          onClick: () => emit('delete', row.id)
        }, () => '删除')
      ])
    }
  }
]
</script>
