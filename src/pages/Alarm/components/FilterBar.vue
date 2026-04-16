<template>
  <div class="flex gap-4 items-end p-5 bg-white rounded-xl border border-gray-200 flex-wrap">
    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-500 whitespace-nowrap">告警时间</span>
      <n-date-picker
        v-model:value="filters.dateRange"
        type="daterange"
        clearable
        placeholder="选择日期范围"
        style="width: 240px;"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-500 whitespace-nowrap">告警名称</span>
      <n-input
        v-model:value="filters.name"
        placeholder="输入告警名称"
        clearable
        style="width: 160px;"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-500 whitespace-nowrap">告警类型</span>
      <n-select
        v-model:value="filters.type"
        :options="typeOptions"
        placeholder="选择类型"
        clearable
        style="width: 140px;"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="text-xs font-medium text-gray-500 whitespace-nowrap">告警状态</span>
      <n-select
        v-model:value="filters.status"
        :options="statusOptions"
        placeholder="选择状态"
        clearable
        style="width: 120px;"
      />
    </div>

    <div class="flex gap-2 ml-auto">
      <n-button type="primary" @click="handleQuery">查询</n-button>
      <n-button @click="handleReset">重置</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { NDatePicker, NInput, NSelect, NButton } from 'naive-ui'

export interface FilterParams {
  dateRange: [number, number] | null
  name: string
  type: string | null
  status: string | null
}

const emit = defineEmits<{
  (e: 'search', params: FilterParams): void
  (e: 'reset'): void
}>()

const filters = reactive<FilterParams>({
  dateRange: null,
  name: '',
  type: null,
  status: null
})

const typeOptions = [
  { label: '打架斗殴', value: 'fighting' },
  { label: '人员摔倒', value: 'fall' },
  { label: '着火预警', value: 'fire' },
  { label: '入侵检测', value: 'intrusion' },
  { label: '未戴安全帽', value: 'helmet' }
]

const statusOptions = [
  { label: '已处置', value: 'handled' },
  { label: '未处置', value: 'pending' },
  { label: '处理中', value: 'processing' }
]

const handleQuery = () => {
  emit('search', { ...filters })
}

const handleReset = () => {
  filters.dateRange = null
  filters.name = ''
  filters.type = null
  filters.status = null
  emit('reset')
}
</script>
