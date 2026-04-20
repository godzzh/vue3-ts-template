<template>
  <div class="p-6 min-h-[calc(100vh-60px)]" style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e8edf4 100%);">
    <!-- 页面标题 -->
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-1 h-8 bg-gradient-to-b from-emerald-600 to-emerald-500 rounded-full"></div>
          <div>
            <h1 class="text-[24px] font-semibold text-slate-800 tracking-tight font-sans">算法中心</h1>
            <p class="text-sm text-slate-500 mt-0.5 tracking-wide">管理AI算法库和版本</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">{{ algorithmList.filter(a => a.status === 'active').length }} 已启用</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">{{ algorithmList.length }} 个算法</span>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <div class="bg-white rounded-xl p-4 flex justify-between items-center mb-6 border border-[#E2E8F0]" style="box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);">
      <div class="flex gap-3 items-center">
        <n-input
          v-model:value="searchKeyword"
          placeholder="搜索算法名称..."
          clearable
          class="!w-60"
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
        <n-button type="primary" @click="handleAdd" class="bg-gradient-primary hover:opacity-90 transition-opacity">
          <template #icon>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </template>
          新增算法
        </n-button>
      </div>
    </div>

    <!-- 骨架屏加载 -->
    <div v-if="loading" class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
      <div
        v-for="i in 6"
        :key="i"
        class="bg-white rounded-xl p-5 border border-gray-100 skeleton"
      >
        <div class="flex items-start">
          <div class="w-14 h-14 rounded-xl bg-gray-100 mr-4 flex-shrink-0"></div>
          <div class="flex-1">
            <div class="h-5 bg-gray-100 rounded w-24 mb-2"></div>
            <div class="h-4 bg-gray-100 rounded w-full mb-3"></div>
            <div class="flex gap-2">
              <div class="h-5 bg-gray-100 rounded w-12"></div>
              <div class="h-5 bg-gray-100 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 算法卡片网格 -->
    <div v-else class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
      <AlgorithmCard
        v-for="(algorithm, index) in filteredList"
        :key="algorithm.id"
        :algorithm="algorithm"
        :style="{ animationDelay: `${index * 50}ms` }"
        class="animate-fade-in-up opacity-0"
        @click="handleCardClick"
        @view-versions="handleViewVersions"
        @version-manage="handleVersionManage"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="!loading && filteredList.length === 0" class="flex flex-col items-center justify-center py-16 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-200 mb-4">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
      <p class="text-sm">暂无算法数据</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { NInput, NButton, useMessage } from 'naive-ui'
import AlgorithmCard, { type Algorithm } from './components/AlgorithmCard.vue'

const message = useMessage()

// 加载状态
const loading = ref(true)

// 搜索关键词
const searchKeyword = ref('')

// 算法列表数据
const algorithmList = ref<Algorithm[]>([
  { id: '1', name: '入侵检测', description: '检测人员非法入侵指定区域，及时发出警报', icon: 'intrusion', version: '2.1.0', status: 'active', category: '安防' },
  { id: '2', name: '拉横幅检测', description: '识别人员在公共场所拉横幅的行为', icon: 'fighting', version: '1.5.0', status: 'active', category: '安防' },
  { id: '3', name: '打架斗殴', description: '检测公共场所打架斗殴行为并告警', icon: 'fighting', version: '3.0.0', status: 'active', category: '安防' },
  { id: '4', name: '烟火识别', description: '检测火焰和烟雾，及时发现火灾隐患', icon: 'fire', version: '2.5.0', status: 'active', category: '消防' },
  { id: '5', name: '聚众识别', description: '检测人群聚集情况，预防群体事件', icon: 'crowd', version: '1.8.0', status: 'inactive', category: '安防' },
  { id: '6', name: '人员摔倒', description: '检测人员摔倒事件，适用于养老院等场景', icon: 'fall', version: '1.2.0', status: 'active', category: '看护' },
  { id: '7', name: '未戴安全帽', description: '检测作业人员是否佩戴安全帽', icon: 'helmet', version: '2.0.0', status: 'active', category: '安全' },
  { id: '8', name: '周界防护', description: '对围栏、周界进行入侵检测防护', icon: 'intrusion', version: '1.9.0', status: 'active', category: '安防' },
  { id: '9', name: '区域入侵', description: '对特定区域进行入侵检测和分析', icon: 'intrusion', version: '2.2.0', status: 'inactive', category: '安防' }
])

// 模拟加载
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 800)
})

// 过滤后的列表
const filteredList = computed(() => {
  if (!searchKeyword.value) {
    return algorithmList.value
  }
  const keyword = searchKeyword.value.toLowerCase()
  return algorithmList.value.filter(algo =>
    algo.name.toLowerCase().includes(keyword) ||
    algo.description.toLowerCase().includes(keyword)
  )
})

// 搜索
const handleSearch = () => {
  message.info(`搜索: ${searchKeyword.value}`)
}

// 新增
const handleAdd = () => {
  message.info('打开新增算法弹窗')
}

// 卡片点击
const handleCardClick = (id: string) => {
  message.info(`查看算法详情: ${id}`)
}

// 查看版本
const handleViewVersions = (id: string) => {
  message.info(`查看版本: ${id}`)
}

// 版本维护
const handleVersionManage = (id: string) => {
  message.info(`版本维护: ${id}`)
}
</script>

<style scoped>
/* 使用全局定义的动画 */
</style>
