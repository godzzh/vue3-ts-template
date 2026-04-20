<template>
  <div class="bg-white rounded-xl p-5 h-full flex flex-col overflow-hidden border border-[#E2E8F0]" style="box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);">
    <div class="mb-4 flex items-center justify-between">
      <span class="text-base font-semibold text-gray-800">处置统计</span>
      <span class="text-xs text-gray-400">本周</span>
    </div>
    <div class="flex-1 flex justify-center min-h-0">
      <VEcharts
        :options="chartOptions"
        :auto-play="false"
        style="width: 100%; height: 100%;"
      />
    </div>
    <div class="flex justify-center gap-6 mt-2 pt-3 border-t border-gray-50">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"></span>
        <span class="text-xs text-gray-500">已处置</span>
        <span class="text-sm font-semibold text-gray-800 font-mono">{{ handled }}%</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/30"></span>
        <span class="text-xs text-gray-500">未处置</span>
        <span class="text-sm font-semibold text-gray-800 font-mono">{{ unhandled }}%</span>
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
