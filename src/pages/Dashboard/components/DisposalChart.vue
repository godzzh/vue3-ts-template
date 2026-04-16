<template>
  <div class="bg-gray-150 rounded-xl p-5 shadow-neu h-full flex flex-col overflow-hidden">
    <div class="mb-4">
      <span class="text-base font-semibold text-gray-800">处置统计</span>
    </div>
    <div class="flex-1 flex justify-center min-h-0">
      <VEcharts
        :options="chartOptions"
        :auto-play="false"
        style="width: 100%; height: 100%;"
      />
    </div>
    <div class="flex justify-center gap-6 mt-2">
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-green-500"></span>
        <span class="text-xs text-gray-500">已处置</span>
        <span class="text-xs font-semibold text-gray-800 font-mono">{{ handled }}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <span class="w-2 h-2 rounded-full bg-red-500"></span>
        <span class="text-xs text-gray-500">未处置</span>
        <span class="text-xs font-semibold text-gray-800 font-mono">{{ unhandled }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VEcharts from '@/common/VEcharts/index.vue'

interface Props {
  handled?: number
  unhandled?: number
}

const props = withDefaults(defineProps<Props>(), {
  handled: 65,
  unhandled: 35
})

const chartOptions = computed(() => ({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c} ({d}%)',
    confine: true,
    extraCssText: 'max-width: 200px; word-wrap: break-word;'
  },
  legend: {
    show: false
  },
  series: [
    {
      name: '处置统计',
      type: 'pie',
      radius: ['50%', '70%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 4,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: props.handled, name: '已处置', itemStyle: { color: '#10B981' } },
        { value: props.unhandled, name: '未处置', itemStyle: { color: '#EF4444' } }
      ]
    }
  ]
}))
</script>
