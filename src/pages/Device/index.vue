<template>
  <div class="p-6 h-[calc(100vh-60px)] flex flex-col" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <!-- 页面标题 -->
    <div class="flex-shrink-0 mb-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-1 h-8 bg-gradient-to-b from-emerald-600 to-emerald-500 rounded-full"></div>
          <div>
            <h1 class="text-[24px] font-semibold text-slate-800 tracking-tight font-sans">设备中心</h1>
            <p class="text-sm text-slate-500 mt-0.5 tracking-wide">管理所有监控设备</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">{{ deviceList.filter(d => d.status === 'online').length }} 在线</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">{{ pagination.total }} 个设备</span>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="flex-shrink-0 bg-white rounded-xl p-4 flex justify-between items-center mb-4 border border-[#E2E8F0]" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);">
      <div class="flex gap-3 items-center">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索设备名称..."
          clearable
          class="!w-52"
          @keydown.enter="handleSearch"
        >
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </template>
        </n-input>
        <n-button type="primary" @click="handleSearch" class="bg-gradient-primary hover:opacity-90 transition-opacity">搜索</n-button>
      </div>
      <div class="flex gap-2">
        <n-button @click="handleBatchDelete" class="hover:bg-gray-50 transition-colors duration-200">
          批量删除
        </n-button>
        <n-button type="primary" @click="handleAdd" class="bg-gradient-primary hover:opacity-90 transition-opacity">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </template>
          新增设备
        </n-button>
      </div>
    </div>

    <!-- 设备表格 -->
    <div class="flex-1 min-h-0 overflow-auto">
      <DeviceTable
        :data="filteredList"
        @edit="handleEdit"
        @delete="handleDelete"
        @view="handleView"
      />
    </div>

    <!-- 分页器 -->
    <div class="flex-shrink-0 flex items-center gap-4 px-5 py-4 bg-white rounded-xl mt-4 justify-end border border-[#E2E8F0]" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);">
      <span class="text-sm text-gray-500">
        共 {{ pagination.total }} 条
      </span>
      <n-pagination
        v-model:page="pagination.page"
        :page-count="pagination.totalPages"
        :page-slot="5"
        show-quick-jumper
        @update:page="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { NInput, NButton, NPagination, useMessage, useDialog } from 'naive-ui'
import DeviceTable, { type Device } from './components/DeviceTable.vue'

const message = useMessage()
const dialog = useDialog()

// 搜索关键词
const searchKeyword = ref('')

// 设备列表数据
const deviceList = ref<Device[]>([
  { id: '1', name: '摄像头-软件园C3栋-01', code: 'CAM-001', type: 'camera', typeName: '枪机', location: '软件园C3栋1楼入口', status: 'online', statusText: '在线', algorithmCount: 3, lastHeartbeat: '2026-03-15 12:00:00' },
  { id: '2', name: '摄像头-软件园C3栋-02', code: 'CAM-002', type: 'camera', typeName: '枪机', location: '软件园C3栋2楼走廊', status: 'online', statusText: '在线', algorithmCount: 2, lastHeartbeat: '2026-03-15 12:00:00' },
  { id: '3', name: '摄像头-软件园C3栋-03', code: 'CAM-003', type: 'camera', typeName: '球机', location: '软件园C3栋大厅', status: 'offline', statusText: '离线', algorithmCount: 4, lastHeartbeat: '2026-03-15 11:30:00' },
  { id: '4', name: '摄像头-软件园C3栋-04', code: 'CAM-004', type: 'camera', typeName: '枪机', location: '软件园C3栋电梯口', status: 'online', statusText: '在线', algorithmCount: 3, lastHeartbeat: '2026-03-15 12:00:00' },
  { id: '5', name: '摄像头-软件园C3栋-05', code: 'CAM-005', type: 'camera', typeName: '枪机', location: '软件园C3栋停车场', status: 'error', statusText: '异常', algorithmCount: 2, lastHeartbeat: '2026-03-15 10:00:00' },
  { id: '6', name: '摄像头-软件园C3栋-06', code: 'CAM-006', type: 'camera', typeName: '球机', location: '软件园C3栋楼顶', status: 'online', statusText: '在线', algorithmCount: 5, lastHeartbeat: '2026-03-15 12:00:00' },
  { id: '7', name: '摄像头-软件园C3栋-07', code: 'CAM-007', type: 'camera', typeName: '枪机', location: '软件园C3栋后门', status: 'online', statusText: '在线', algorithmCount: 2, lastHeartbeat: '2026-03-15 12:00:00' },
  { id: '8', name: '摄像头-软件园C3栋-08', code: 'CAM-008', type: 'camera', typeName: '枪机', location: '软件园C3栋围墙', status: 'offline', statusText: '离线', algorithmCount: 1, lastHeartbeat: '2026-03-15 09:00:00' }
])

// 过滤后的列表
const filteredList = computed(() => {
  if (!searchKeyword.value) {
    return deviceList.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return deviceList.value.filter(device =>
    device.name.toLowerCase().includes(keyword) ||
    device.code.toLowerCase().includes(keyword) ||
    device.location.toLowerCase().includes(keyword)
  )
})

// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 100,
  totalPages: 10
})

// 搜索
const handleSearch = () => {
  message.info(`搜索: ${searchKeyword.value}`)
}

// 新增
const handleAdd = () => {
  message.info('打开新增设备弹窗')
}

// 编辑
const handleEdit = (id: string) => {
  message.info(`编辑设备: ${id}`)
}

// 查看详情
const handleView = (id: string) => {
  message.info(`查看设备详情: ${id}`)
}

// 删除
const handleDelete = (id: string) => {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除设备 #${id} 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      deviceList.value = deviceList.value.filter(d => d.id !== id)
      message.success('删除成功')
    }
  })
}

// 批量删除
const handleBatchDelete = () => {
  message.warning('批量删除功能')
}

// 分页切换
const handlePageChange = (page: number) => {
  pagination.page = page
  message.info(`切换到第 ${page} 页`)
}
</script>
