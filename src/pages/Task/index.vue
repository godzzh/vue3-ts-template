<template>
  <div class="p-6 h-[calc(100vh-60px)] flex flex-col" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <!-- 页面标题 -->
    <div class="flex-shrink-0 mb-5">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-1 h-8 bg-gradient-to-b from-primary-500 to-primary-400 rounded-full"></div>
          <div>
            <h1 class="text-[24px] font-semibold text-slate-800 tracking-tight font-sans">任务中心</h1>
            <p class="text-sm text-slate-500 mt-0.5 tracking-wide">管理和配置视频分析任务</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-primary-50 text-primary-500 text-xs font-medium rounded-full">{{ pagination.total }} 个任务</span>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="flex-shrink-0 mb-4">
      <div class="bg-white rounded-xl p-4 flex gap-3 border border-gray-100" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);">
        <n-button type="primary" class="bg-gradient-primary hover:opacity-90 transition-opacity" @click="handleAdd">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </template>
          新增任务
        </n-button>
        <n-button @click="handleBatchStart" class="hover:bg-gray-50 transition-colors duration-200">
          批量启用
        </n-button>
        <n-button @click="handleBatchStop" class="hover:bg-gray-50 transition-colors duration-200">
          批量停用
        </n-button>
      </div>
    </div>

    <!-- 任务表格 -->
    <div class="flex-1 min-h-0 overflow-auto">
      <TaskTable
        :data="taskList"
        @edit="handleEdit"
        @view="handleView"
        @toggle="handleToggle"
      />
    </div>

    <!-- 分页器 -->
    <div class="flex-shrink-0 flex items-center gap-4 px-5 py-4 bg-white rounded-xl mt-4 justify-end border border-gray-100" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);">
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

    <!-- 任务表单 -->
    <TaskForm ref="taskFormRef" @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { NButton, NPagination, useMessage } from 'naive-ui'
import TaskTable, { type Task } from './components/TaskTable.vue'
import TaskForm from './components/TaskForm.vue'

const message = useMessage()

// 任务列表数据
const taskList = ref<Task[]>([
  { id: '1', taskId: 'gl0001', name: '软件园入侵检测', algorithm: '入侵检测', deviceCount: 30, priority: 'high', priorityText: '高', status: 'enabled', statusText: '启用', creator: '系统管理员', createTime: '2026-03-12 12:00:00' },
  { id: '2', taskId: 'gl0002', name: '园区烟火识别', algorithm: '烟火识别', deviceCount: 15, priority: 'high', priorityText: '高', status: 'enabled', statusText: '启用', creator: '系统管理员', createTime: '2026-03-12 13:00:00' },
  { id: '3', taskId: 'gl0003', name: '人群聚集监测', algorithm: '聚众识别', deviceCount: 20, priority: 'medium', priorityText: '中', status: 'disabled', statusText: '停用', creator: '系统管理员', createTime: '2026-03-12 14:00:00' },
  { id: '4', taskId: 'gl0004', name: '打架斗殴检测', algorithm: '打架斗殴', deviceCount: 25, priority: 'high', priorityText: '高', status: 'enabled', statusText: '启用', creator: '张三', createTime: '2026-03-12 15:00:00' },
  { id: '5', taskId: 'gl0005', name: '人员摔倒检测', algorithm: '人员摔倒', deviceCount: 10, priority: 'low', priorityText: '低', status: 'enabled', statusText: '启用', creator: '李四', createTime: '2026-03-12 16:00:00' },
  { id: '6', taskId: 'gl0006', name: '周界防护检测', algorithm: '入侵检测', deviceCount: 40, priority: 'high', priorityText: '高', status: 'enabled', statusText: '启用', creator: '王五', createTime: '2026-03-12 17:00:00' }
])

// 分页配置
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 100,
  totalPages: 10
})

// 任务表单 ref
const taskFormRef = ref()

// 新增
const handleAdd = () => {
  taskFormRef.value?.open()
}

// 编辑
const handleEdit = (id: string) => {
  taskFormRef.value?.open(id)
}

// 查看详情
const handleView = (id: string) => {
  message.info(`查看任务详情: ${id}`)
}

// 启停切换
const handleToggle = (id: string) => {
  const task = taskList.value.find(t => t.id === id)
  if (task) {
    task.status = task.status === 'enabled' ? 'disabled' : 'enabled'
    task.statusText = task.status === 'enabled' ? '启用' : '停用'
    message.success(`${task.statusText}任务成功`)
  }
}

// 批量启用
const handleBatchStart = () => {
  message.success('批量启用成功')
}

// 批量停用
const handleBatchStop = () => {
  message.success('批量停用成功')
}

// 分页切换
const handlePageChange = (page: number) => {
  pagination.page = page
  message.info(`切换到第 ${page} 页`)
}

// 提交表单
const handleSubmit = (payload: { id: string | null; data: any }) => {
  if (payload.id) {
    message.success(`更新任务成功: ${payload.id}`)
  } else {
    message.success('新增任务成功')
  }
}
</script>
