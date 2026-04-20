<template>
  <div class="p-6 h-[calc(100vh-60px)] flex flex-col" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <!-- 页面标题 -->
    <div class="flex-shrink-0 mb-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-1 h-8 bg-gradient-to-b from-red-500 to-red-400 rounded-full"></div>
          <div>
            <h1 class="text-[24px] font-semibold text-slate-800 tracking-tight font-sans">告警中心</h1>
            <p class="text-sm text-slate-500 mt-0.5 tracking-wide">管理和处理所有告警信息</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-red-50 text-red-500 text-xs font-medium rounded-full">{{ pagination.total }} 条告警</span>
        </div>
      </div>
    </div>

    <!-- 筛选栏 -->
    <div class="flex-shrink-0 mb-4">
      <FilterBar @search="handleSearch" @reset="handleReset" />
    </div>

    <!-- 告警表格 -->
    <div class="flex-1 min-h-0 overflow-auto">
      <AlarmTable
        :data="alarmList"
        :pagination="paginationConfig"
        @view-detail="handleViewDetail"
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

    <!-- 详情弹窗 -->
    <DetailDrawer ref="detailDrawerRef" @dispose="handleDispose" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useMessage } from 'naive-ui'
import FilterBar, { type FilterParams } from './components/FilterBar.vue'
import AlarmTable, { type Alarm } from './components/AlarmTable.vue'
import DetailDrawer from './components/DetailDrawer.vue'

const message = useMessage()

// 告警列表数据
const alarmList = ref<Alarm[]>([
  { id: 1, image: '', location: '软件园C3栋', time: '2026-03-06 12:00:00', type: 'fighting', typeName: '打架斗殴', status: 'handled', statusText: '已处置' },
  { id: 2, image: '', location: '软件园C3栋', time: '2026-03-06 13:00:00', type: 'helmet', typeName: '未戴安全帽', status: 'pending', statusText: '未处置' },
  { id: 3, image: '', location: '软件园C3栋', time: '2026-03-06 14:00:00', type: 'fall', typeName: '人员摔倒', status: 'processing', statusText: '处理中' },
  { id: 4, image: '', location: '软件园C3栋', time: '2026-03-06 15:00:00', type: 'fire', typeName: '着火预警', status: 'pending', statusText: '未处置' },
  { id: 5, image: '', location: '软件园C3栋', time: '2026-03-06 16:00:00', type: 'intrusion', typeName: '入侵检测', status: 'handled', statusText: '已处置' },
  { id: 6, image: '', location: '软件园C3栋', time: '2026-03-06 17:00:00', type: 'fighting', typeName: '打架斗殴', status: 'pending', statusText: '未处置' },
  { id: 7, image: '', location: '软件园C3栋', time: '2026-03-06 18:00:00', type: 'helmet', typeName: '未戴安全帽', status: 'handled', statusText: '已处置' },
  { id: 8, image: '', location: '软件园C3栋', time: '2026-03-06 19:00:00', type: 'fall', typeName: '人员摔倒', status: 'processing', statusText: '处理中' },
  { id: 9, image: '', location: '软件园C3栋', time: '2026-03-06 20:00:00', type: 'fire', typeName: '着火预警', status: 'pending', statusText: '未处置' },
  { id: 10, image: '', location: '软件园C3栋', time: '2026-03-06 21:00:00', type: 'intrusion', typeName: '入侵检测', status: 'handled', statusText: '已处置' }
])

// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 100,
  totalPages: 10
})

const paginationConfig = computed(() => ({
  page: pagination.page,
  pageSize: pagination.pageSize,
  pageCount: pagination.totalPages,
  onUpdatePage: (page: number) => {
    pagination.page = page
  }
}))

// 详情弹窗 ref
const detailDrawerRef = ref()

// 搜索
const handleSearch = (params: FilterParams) => {
  console.log('搜索条件:', params)
  message.success('搜索告警列表')
}

// 重置
const handleReset = () => {
  message.info('已重置筛选条件')
}

// 分页切换
const handlePageChange = (page: number) => {
  pagination.page = page
  message.info(`切换到第 ${page} 页`)
}

// 查看详情
const handleViewDetail = (id: number) => {
  const alarm = alarmList.value.find(item => item.id === id)
  if (alarm) {
    detailDrawerRef.value?.open(alarm)
  }
}

// 处置
const handleDispose = (id: number) => {
  message.success(`开始处置告警 #${id}`)
}
</script>
