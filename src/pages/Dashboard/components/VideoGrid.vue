<template>
  <div class="bg-gray-150 rounded-xl p-5 shadow-neu">
    <div class="flex justify-between items-center mb-4">
      <span class="text-base font-semibold text-gray-800">实时监控</span>
      <span class="text-xs text-gray-500">{{ videos.length }}路摄像头</span>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div
        v-for="(video, index) in videos"
        :key="index"
        class="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="absolute inset-0 flex items-center justify-center text-white/30">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
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
        <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent flex justify-between items-center">
          <span class="text-xs text-white font-medium">{{ video.location }}</span>
          <span class="flex items-center gap-1 text-xs text-white">
            <span class="w-1.5 h-1.5 rounded-full" :class="video.status === 'online' ? 'bg-green-500' : 'bg-red-500'"></span>
            {{ video.statusText }}
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
