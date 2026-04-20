<template>
  <div class="bg-white rounded-xl p-5 border border-gray-100" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <div class="flex justify-between items-center mb-4">
      <div class="flex items-center gap-2">
        <span class="text-base font-semibold text-gray-800">实时监控</span>
        <span class="px-2 py-0.5 bg-primary-50 text-primary-500 text-xs font-medium rounded-full">{{ videos.length }}路</span>
      </div>
      <span class="text-xs text-gray-400">最近更新: 刚刚</span>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-primary-500/20"
        :style="{ animationDelay: `${index * 50}ms` }"
      >
        <!-- 视频网格叠加效果 -->
        <div class="absolute inset-0 opacity-20">
          <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 20px 20px;"></div>
        </div>

        <!-- 居中图标 -->
        <div class="absolute inset-0 flex items-center justify-center text-white/20 group-hover:text-white/30 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m16 6 4 14"/>
            <path d="M12 6v14"/>
            <path d="m8 8 4-4 4 4"/>
            <path d="M12 6 8 2l4-4 4 4"/>
            <path d="M8 22 4 18"/>
            <path d="m4 18 4-4"/>
            <path d="m16 22 4-4"/>
            <path d="m20 18-4-4"/>
          </svg>
        </div>

        <!-- 底部信息栏 -->
        <div class="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div class="flex justify-between items-center">
            <span class="text-xs text-white font-medium truncate">{{ video.location }}</span>
            <span class="flex items-center gap-1.5 text-xs text-white/80">
              <span class="w-2 h-2 rounded-full animate-pulse" :class="video.status === 'online' ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-red-400 shadow-lg shadow-red-400/50'"></span>
              {{ video.statusText }}
            </span>
          </div>
        </div>

        <!-- 在线指示灯 -->
        <div v-if="video.status === 'online'" class="absolute top-2 right-2">
          <span class="flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Video {
  id: number
  location: string
  status: 'online' | 'offline'
  statusText: string
}

const props = withDefaults(defineProps<{
  videos?: Video[]
}>(), {
  videos: () => [
    { id: 1, location: '软件园C3栋', status: 'online', statusText: '在线' },
    { id: 2, location: '软件园C3栋', status: 'online', statusText: '在线' },
    { id: 3, location: '软件园C3栋', status: 'offline', statusText: '离线' },
    { id: 4, location: '软件园C3栋', status: 'online', statusText: '在线' },
    { id: 5, location: '软件园C3栋', status: 'online', statusText: '在线' },
    { id: 6, location: '软件园C3栋', status: 'online', statusText: '在线' }
  ]
})
</script>
