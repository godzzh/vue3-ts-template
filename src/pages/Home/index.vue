<template>
    <div class="grid gap-5">
        <section
            class="flex items-end justify-between gap-6 max-[600px]:flex-col max-[600px]:items-start"
        >
            <div>
                <p class="mb-1 text-[12px] text-[var(--text-color-muted)]">欢迎回来，周明远</p>
                <h1
                    class="m-0 text-[28px] font-semibold tracking-[-0.04em] text-[var(--text-color)]"
                >
                    分析页
                </h1>
                <span class="text-xs text-[var(--text-color-secondary)]"
                    >这里汇总今天的业务表现与待处理事项。</span
                >
            </div>
            <div class="flex gap-2 max-[600px]:w-full">
                <button
                    class="h-[37.6px] rounded-[7.2px] border border-[var(--border-color)] bg-[var(--bg-surface)] px-3.5 text-xs text-[var(--text-color-secondary)] transition duration-150 hover:-translate-y-px hover:shadow-card max-[600px]:flex-1"
                >
                    <i class="ri-download-cloud-2-line mr-1.5"></i>导出报告
                </button>
                <button
                    class="h-[37.6px] rounded-[7.2px] border border-primary-500 bg-primary-500 px-3.5 text-xs text-white shadow-primary transition duration-150 hover:-translate-y-px max-[600px]:flex-1"
                >
                    <i class="ri-add-line mr-1.5"></i>新建任务
                </button>
            </div>
        </section>

        <section
            class="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1"
            aria-label="核心指标"
        >
            <article
                v-for="item in metrics"
                :key="item.label"
                class="rounded-[10.4px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-[17.6px] shadow-[var(--panel-shadow)]"
            >
                <div
                    class="flex items-center justify-between text-[12px] text-[var(--text-color-muted)]"
                >
                    <span>{{ item.label }}</span>
                    <i
                        :class="item.icon"
                        class="grid size-8 place-items-center rounded-md bg-[color-mix(in_srgb,var(--primary-color)_9%,transparent)] text-base text-[var(--primary-color)]"
                    ></i>
                </div>
                <strong class="mt-2.5 block font-mono text-[22px] text-[var(--text-color)]">{{
                    item.value
                }}</strong>
                <p
                    class="mb-0 mt-2 text-[12px]"
                    :class="item.trend > 0 ? 'text-emerald-600' : 'text-red-600'"
                >
                    <i :class="item.trend > 0 ? 'ri-arrow-up-line' : 'ri-arrow-down-line'"></i
                    >{{ Math.abs(item.trend) }}%
                    <small class="text-[var(--text-color-muted)]">较上个周期</small>
                </p>
            </article>
        </section>

        <section
            class="grid grid-cols-[minmax(0,1.8fr)_minmax(272px,0.75fr)] gap-4 max-[1100px]:grid-cols-1"
        >
            <article
                class="min-w-0 overflow-hidden rounded-[10.4px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--panel-shadow)]"
            >
                <header
                    class="flex min-h-16 items-center justify-between border-b border-[var(--border-color)] px-4 py-3.5"
                >
                    <div>
                        <h2 class="m-0 text-sm font-semibold text-[var(--text-color)]">访问趋势</h2>
                        <p class="mb-0 mt-1 text-[12px] text-[var(--text-color-muted)]">
                            近 7 天访问量与转化趋势
                        </p>
                    </div>
                    <Tabs v-model="period" :options="periods" :show-all="false" />
                </header>
                <div class="h-72 p-2"><VEcharts :options="lineOptions" /></div>
            </article>

            <article
                class="min-w-0 overflow-hidden rounded-[10.4px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--panel-shadow)]"
            >
                <header
                    class="flex min-h-16 items-center justify-between border-b border-[var(--border-color)] px-4 py-3.5"
                >
                    <div>
                        <h2 class="m-0 text-sm font-semibold text-[var(--text-color)]">渠道占比</h2>
                        <p class="mb-0 mt-1 text-[12px] text-[var(--text-color-muted)]">
                            本月新增访问来源
                        </p>
                    </div>
                    <i class="ri-more-2-fill text-[var(--text-color-muted)]"></i>
                </header>
                <div class="relative h-44">
                    <VEcharts :options="pieOptions" /><span
                        class="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 text-center"
                        ><strong class="font-mono text-[var(--text-color)]">24.8k</strong
                        ><small class="text-[12px] text-[var(--text-color-muted)]"
                            >总访问</small
                        ></span
                    >
                </div>
                <ul class="mb-4 grid list-none gap-2.5 px-[17.6px]">
                    <li
                        v-for="item in channels"
                        :key="item.name"
                        class="flex items-center justify-between text-[12px] text-[var(--text-color-secondary)]"
                    >
                        <span class="flex items-center gap-1.5"
                            ><i class="size-1.5" :style="{ background: item.color }"></i
                            >{{ item.name }}</span
                        ><strong class="font-mono text-[var(--text-color)]"
                            >{{ item.value }}%</strong
                        >
                    </li>
                </ul>
            </article>

            <article
                class="col-start-1 min-w-0 overflow-hidden rounded-[10.4px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--panel-shadow)] max-[1100px]:col-auto"
            >
                <header
                    class="flex min-h-16 items-center justify-between border-b border-[var(--border-color)] px-4 py-3.5"
                >
                    <div>
                        <h2 class="m-0 text-sm font-semibold text-[var(--text-color)]">近期任务</h2>
                        <p class="mb-0 mt-1 text-[12px] text-[var(--text-color-muted)]">
                            团队正在推进的工作
                        </p>
                    </div>
                    <router-link
                        class="text-[12px] text-[var(--primary-color)] no-underline"
                        to="/workspace"
                        >查看全部</router-link
                    >
                </header>
                <div class="overflow-auto">
                    <table class="w-full border-collapse text-[12px]">
                        <thead>
                            <tr>
                                <th
                                    v-for="heading in taskHeadings"
                                    :key="heading"
                                    class="whitespace-nowrap bg-[var(--bg-base)] px-3.5 py-3 text-left font-medium text-[var(--text-color-muted)]"
                                >
                                    {{ heading }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in tasks" :key="task.name">
                                <td
                                    class="flex items-center gap-2 whitespace-nowrap border-t border-[var(--border-color-light)] px-3.5 py-3 text-[var(--text-color-secondary)]"
                                >
                                    <i
                                        :class="task.icon"
                                        class="grid size-7 place-items-center bg-[color-mix(in_srgb,var(--primary-color)_8%,transparent)] text-[var(--primary-color)]"
                                    ></i
                                    ><b>{{ task.name }}</b>
                                </td>
                                <td
                                    class="whitespace-nowrap border-t border-[var(--border-color-light)] px-3.5 py-3 text-[var(--text-color-secondary)]"
                                >
                                    {{ task.owner }}
                                </td>
                                <td
                                    class="whitespace-nowrap border-t border-[var(--border-color-light)] px-3.5 py-3"
                                >
                                    <span
                                        class="rounded-[4.8px] px-1.5 py-1"
                                        :class="statusClasses[task.type]"
                                        >{{ task.status }}</span
                                    >
                                </td>
                                <td
                                    class="flex items-center gap-2 whitespace-nowrap border-t border-[var(--border-color-light)] px-3.5 py-3 text-[var(--text-color-secondary)]"
                                >
                                    <span
                                        class="h-1 w-[67.2px] overflow-hidden rounded-full bg-[var(--track-bg)]"
                                        ><i
                                            class="block h-full bg-[var(--primary-color)]"
                                            :style="{ width: `${task.progress}%` }"
                                        ></i></span
                                    >{{ task.progress }}%
                                </td>
                                <td
                                    class="whitespace-nowrap border-t border-[var(--border-color-light)] px-3.5 py-3 text-[var(--text-color-secondary)]"
                                >
                                    {{ task.deadline }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>

            <aside
                class="col-start-2 row-start-2 min-w-0 overflow-hidden rounded-[10.4px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--panel-shadow)] max-[1100px]:col-auto max-[1100px]:row-auto"
            >
                <header
                    class="flex min-h-16 items-center border-b border-[var(--border-color)] px-4 py-3.5"
                >
                    <div>
                        <h2 class="m-0 text-sm font-semibold text-[var(--text-color)]">动态</h2>
                        <p class="mb-0 mt-1 text-[12px] text-[var(--text-color-muted)]">
                            最近的系统操作
                        </p>
                    </div>
                </header>
                <ol class="m-0 list-none px-4 py-2.5">
                    <li
                        v-for="item in activities"
                        :key="item.time"
                        class="grid grid-cols-[2rem_1fr] gap-2.5 py-2.5"
                    >
                        <i
                            :class="item.icon"
                            class="grid size-8 place-items-center rounded-md bg-[color-mix(in_srgb,var(--primary-color)_8%,transparent)] text-[var(--primary-color)]"
                        ></i>
                        <div>
                            <p class="mb-0 mt-0.5 text-[12px] text-[var(--text-color-secondary)]">
                                <b>{{ item.user }}</b> {{ item.title }}
                            </p>
                            <time class="text-[12px] text-[var(--text-color-muted)]">{{
                                item.time
                            }}</time>
                        </div>
                    </li>
                </ol>
            </aside>
        </section>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import Tabs from '@/components/Tabs/index.vue';
import VEcharts from '@/common/VEcharts/index.vue';

const taskHeadings = ['任务名称', '负责人', '状态', '进度', '截止日期'];
const statusClasses: Record<string, string> = {
    active: 'bg-[var(--success-soft)] text-emerald-700',
    review: 'bg-[var(--warning-soft)] text-amber-700',
    done: 'bg-[var(--neutral-soft)] text-[var(--text-color-secondary)]',
};
const metrics = [
    { label: '总访问量', value: '82,451', trend: 12.6, icon: 'ri-line-chart-line' },
    { label: '活跃用户', value: '6,238', trend: 8.2, icon: 'ri-user-heart-line' },
    { label: '转化订单', value: '1,429', trend: -2.4, icon: 'ri-shopping-bag-3-line' },
    { label: '本月收入', value: '¥386,720', trend: 16.8, icon: 'ri-wallet-3-line' },
];
const period = ref<string | number>('week');
const periods = [
    { label: '本周', value: 'week' },
    { label: '本月', value: 'month' },
];
const lineOptions = computed(() => ({
    tooltip: { trigger: 'axis' },
    grid: { top: 24, left: 12, right: 12, bottom: 8, containLabel: true },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:
            period.value === 'week'
                ? ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                : ['第1周', '第2周', '第3周', '第4周', '第5周'],
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#8a9691' },
    },
    yAxis: {
        type: 'value',
        splitNumber: 4,
        axisLabel: { color: '#8a9691' },
        splitLine: { lineStyle: { color: 'rgba(128,145,138,.13)', type: 'dashed' } },
    },
    series: [
        {
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 7,
            data:
                period.value === 'week'
                    ? [3420, 4180, 3890, 5260, 4880, 6120, 6840]
                    : [18500, 21200, 19800, 24600, 27300],
            lineStyle: { color: '#184cff', width: 3 },
            itemStyle: { color: '#184cff' },
            areaStyle: { color: 'rgba(24,76,255,.12)' },
        },
    ],
}));
const channels = [
    { name: '直接访问', value: 42.7, color: '#184cff' },
    { name: '搜索引擎', value: 31.4, color: '#5e84ff' },
    { name: '外部链接', value: 17.8, color: '#91a7ff' },
    { name: '其他渠道', value: 8.1, color: '#dce6ff' },
];
const pieOptions = {
    series: [
        {
            type: 'pie',
            radius: ['68%', '86%'],
            label: { show: false },
            itemStyle: { borderColor: '#fff', borderWidth: 3 },
            data: channels.map((i) => ({
                value: i.value,
                name: i.name,
                itemStyle: { color: i.color },
            })),
        },
    ],
};
const tasks = [
    {
        name: '移动端体验优化',
        owner: '林清越',
        status: '进行中',
        type: 'active',
        progress: 72,
        deadline: '06-28',
        icon: 'ri-smartphone-line',
    },
    {
        name: '季度数据复盘',
        owner: '孟书言',
        status: '待审核',
        type: 'review',
        progress: 91,
        deadline: '06-24',
        icon: 'ri-file-chart-line',
    },
    {
        name: '会员体系改版',
        owner: '乔以宁',
        status: '进行中',
        type: 'active',
        progress: 48,
        deadline: '07-05',
        icon: 'ri-vip-crown-line',
    },
    {
        name: '接口性能治理',
        owner: '陈砚秋',
        status: '已完成',
        type: 'done',
        progress: 100,
        deadline: '06-19',
        icon: 'ri-speed-up-line',
    },
];
const activities = [
    { user: '林清越', title: '更新了移动端体验优化', time: '8 分钟前', icon: 'ri-pencil-line' },
    { user: '孟书言', title: '提交季度报告审核', time: '36 分钟前', icon: 'ri-file-upload-line' },
    { user: '乔以宁', title: '创建会员体系迭代', time: '2 小时前', icon: 'ri-add-box-line' },
    {
        user: '陈砚秋',
        title: '完成接口性能治理',
        time: '昨天 18:42',
        icon: 'ri-checkbox-circle-line',
    },
];
</script>
