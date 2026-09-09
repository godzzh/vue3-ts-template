<template>
    <div class="grid gap-4">
        <header class="flex items-end justify-between gap-6 max-[720px]:items-start">
            <div>
                <p class="mb-1 mt-0 text-[12px] text-[var(--text-color-muted)]">数据中心</p>
                <h1 class="m-0 text-[28px] font-semibold tracking-[-0.04em] text-[var(--text-color)]">
                    数据报表
                </h1>
                <p class="mb-0 mt-2 text-[14px] text-[var(--text-color-secondary)]">
                    管理周期性业务报表，快速定位生成状态与负责人。
                </p>
            </div>
            <n-button type="primary" @click="openCreateModal">
                <template #icon>
                    <i class="ri-add-line" aria-hidden="true"></i>
                </template>
                新增报表</n-button>
        </header>

        <section
            class="rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 shadow-[var(--panel-shadow)]"
            aria-label="报表筛选">
            <n-form :model="filters" label-placement="left" :show-feedback="false">
                <div
                    class="grid grid-cols-[minmax(220px,1.5fr)_minmax(160px,0.7fr)_minmax(160px,0.7fr)_auto] items-end gap-3 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
                    <n-form-item label="搜索报表">
                        <n-input v-model:value="filters.keyword" clearable placeholder="输入报表名称或负责人">
                            <template #prefix><i class="ri-search-line" aria-hidden="true"></i></template>
                        </n-input>
                    </n-form-item>
                    <n-form-item label="报表类型">
                        <n-select v-model:value="filters.type" :options="typeFilterOptions" />
                    </n-form-item>
                    <n-form-item label="生成状态">
                        <n-select v-model:value="filters.status" :options="statusFilterOptions" />
                    </n-form-item>
                    <div class="flex h-[34px] items-center gap-2 max-[600px]:w-full">
                        <n-button class="max-[600px]:flex-1" type="primary" @click="applyFilters">
                            查询
                        </n-button>
                        <n-button class="max-[600px]:flex-1" @click="resetFilters">重置</n-button>
                    </div>
                </div>
            </n-form>
        </section>

        <section
            class="overflow-hidden rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--panel-shadow)]"
            aria-label="报表列表">
            <div class="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3">
                <div>
                    <strong class="text-[15px] font-semibold text-[var(--text-color)]">报表列表</strong>
                    <span class="ml-2 text-[12px] text-[var(--text-color-muted)]">
                        共 {{ filteredReports.length }} 条
                    </span>
                </div>
                <n-button text @click="refreshReports">
                    <template #icon><i class="ri-refresh-line" aria-hidden="true"></i></template>
                    刷新
                </n-button>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-[900px] border-collapse text-left text-[13px]">
                    <thead>
                        <tr class="bg-[var(--bg-base)] text-[var(--text-color-muted)]">
                            <th class="px-4 py-3 font-medium">报表名称</th>
                            <th class="px-4 py-3 font-medium">类型</th>
                            <th class="px-4 py-3 font-medium">统计周期</th>
                            <th class="px-4 py-3 font-medium">负责人</th>
                            <th class="px-4 py-3 font-medium">状态</th>
                            <th class="px-4 py-3 font-medium">更新时间</th>
                            <th class="px-4 py-3 text-right font-medium">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in paginatedReports" :key="report.id"
                            class="border-t border-[var(--border-color-light)] transition-colors hover:bg-[var(--hover-overlay)]">
                            <td class="px-4 py-3.5">
                                <div class="flex items-center gap-3">
                                    <span
                                        class="grid size-9 shrink-0 place-items-center rounded-[8px] bg-[color-mix(in_srgb,var(--primary-color)_9%,transparent)] text-[17px] text-[var(--primary-color)]">
                                        <i :class="report.icon" aria-hidden="true"></i>
                                    </span>
                                    <div>
                                        <strong class="block font-medium text-[var(--text-color)]">{{ report.name
                                            }}</strong>
                                        <small class="mt-1 block text-[12px] text-[var(--text-color-muted)]">{{
                                            report.code
                                            }}</small>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3.5 text-[var(--text-color-secondary)]">
                                {{ report.type }}
                            </td>
                            <td class="px-4 py-3.5 font-mono text-[var(--text-color-secondary)]">
                                {{ report.period }}
                            </td>
                            <td class="px-4 py-3.5 text-[var(--text-color-secondary)]">
                                {{ report.owner }}
                            </td>
                            <td class="px-4 py-3.5">
                                <span
                                    class="inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[12px] font-medium"
                                    :class="statusClasses[report.status]">
                                    <i :class="statusIcons[report.status]" aria-hidden="true"></i>
                                    {{ report.status }}
                                </span>
                            </td>
                            <td class="px-4 py-3.5 font-mono text-[12px] text-[var(--text-color-muted)]">
                                {{ report.updatedAt }}
                            </td>
                            <td class="px-4 py-3.5 text-right">
                                <n-button text type="primary" @click="viewReport(report)">查看</n-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="filteredReports.length === 0"
                class="grid min-h-[260px] place-items-center border-t border-[var(--border-color-light)] px-4 py-10 text-center">
                <div>
                    <i class="ri-file-search-line text-[32px] text-[var(--text-color-muted)]" aria-hidden="true"></i>
                    <p class="mb-0 mt-3 text-[14px] text-[var(--text-color-secondary)]">
                        未找到匹配的报表
                    </p>
                    <button class="mt-2 border-0 bg-transparent text-[13px] text-[var(--primary-color)]" type="button"
                        @click="resetFilters">
                        清空筛选条件
                    </button>
                </div>
            </div>

            <footer v-if="filteredReports.length > 0"
                class="flex justify-end border-t border-[var(--border-color)] px-4 py-3">
                <n-pagination v-model:page="page" :page-size="pageSize" :item-count="filteredReports.length"
                    show-size-picker="false" />
            </footer>
        </section>

        <VModal v-model:show="createVisible" title="新增报表" :loading="submitting"
            style="width: min(560px, calc(100vw - 32px))" @close="closeCreateModal">
            <n-form ref="createFormRef" :model="createForm" :rules="createRules" label-placement="top">
                <n-form-item label="报表名称" path="name">
                    <n-input v-model:value="createForm.name" maxlength="40" show-count placeholder="例如：华东区域销售月报" />
                </n-form-item>
                <div class="grid grid-cols-2 gap-3 max-[520px]:grid-cols-1">
                    <n-form-item label="报表类型" path="type">
                        <n-select v-model:value="createForm.type" :options="typeCreateOptions" placeholder="选择类型" />
                    </n-form-item>
                    <n-form-item label="统计周期" path="period">
                        <n-date-picker v-model:formatted-value="createForm.period" value-format="yyyy-MM" type="month"
                            clearable class="w-full" />
                    </n-form-item>
                </div>
                <n-form-item label="负责人" path="owner">
                    <n-input v-model:value="createForm.owner" maxlength="20" placeholder="输入负责人姓名" />
                </n-form-item>
                <n-form-item label="报表说明" path="description">
                    <n-input v-model:value="createForm.description" type="textarea"
                        :autosize="{ minRows: 3, maxRows: 5 }" maxlength="160" show-count placeholder="简要说明报表用途与数据范围" />
                </n-form-item>
            </n-form>
            <template #footer>
                <n-button :disabled="submitting" @click="closeCreateModal">取消</n-button>
                <n-button type="primary" :loading="submitting" @click="submitReport">确认新增</n-button>
            </template>
        </VModal>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import type { FormInst, FormRules, SelectOption } from 'naive-ui';
import VModal from '@/common/VModal/index.vue';

type ReportStatus = '已生成' | '生成中' | '待生成';
type Report = {
    id: number;
    name: string;
    code: string;
    type: string;
    period: string;
    owner: string;
    status: ReportStatus;
    updatedAt: string;
    icon: string;
};

const sourceReports = ref<Report[]>([
    {
        id: 1,
        name: '全渠道经营分析月报',
        code: 'RPT-2025-0618',
        type: '经营分析',
        period: '2025-06',
        owner: '孟书言',
        status: '已生成',
        updatedAt: '2025-06-18 09:42',
        icon: 'ri-line-chart-line',
    },
    {
        id: 2,
        name: '区域销售业绩周报',
        code: 'RPT-2025-0617',
        type: '销售业绩',
        period: '2025-W25',
        owner: '林清越',
        status: '生成中',
        updatedAt: '2025-06-18 09:16',
        icon: 'ri-bar-chart-grouped-line',
    },
    {
        id: 3,
        name: '会员增长与留存分析',
        code: 'RPT-2025-0616',
        type: '用户分析',
        period: '2025-06',
        owner: '乔以宁',
        status: '已生成',
        updatedAt: '2025-06-17 17:30',
        icon: 'ri-user-follow-line',
    },
    {
        id: 4,
        name: '支付转化漏斗日报',
        code: 'RPT-2025-0615',
        type: '经营分析',
        period: '2025-06-17',
        owner: '陈砚秋',
        status: '待生成',
        updatedAt: '2025-06-17 16:08',
        icon: 'ri-filter-3-line',
    },
    {
        id: 5,
        name: '商品动销效率月报',
        code: 'RPT-2025-0614',
        type: '商品分析',
        period: '2025-05',
        owner: '顾知遥',
        status: '已生成',
        updatedAt: '2025-06-17 11:24',
        icon: 'ri-shopping-bag-3-line',
    },
    {
        id: 6,
        name: '客户服务质量周报',
        code: 'RPT-2025-0613',
        type: '服务质量',
        period: '2025-W24',
        owner: '周明远',
        status: '已生成',
        updatedAt: '2025-06-16 18:50',
        icon: 'ri-customer-service-2-line',
    },
    {
        id: 7,
        name: '营销活动投入产出分析',
        code: 'RPT-2025-0612',
        type: '销售业绩',
        period: '2025-05',
        owner: '林清越',
        status: '待生成',
        updatedAt: '2025-06-16 14:05',
        icon: 'ri-funds-line',
    },
]);

const typeCreateOptions: SelectOption[] = [
    '经营分析',
    '销售业绩',
    '用户分析',
    '商品分析',
    '服务质量',
].map((label) => ({ label, value: label }));
const typeFilterOptions: SelectOption[] = [
    { label: '全部类型', value: 'all' },
    ...typeCreateOptions,
];
const statusFilterOptions: SelectOption[] = ['全部状态', '已生成', '生成中', '待生成'].map(
    (label, index) => ({ label, value: index === 0 ? 'all' : label })
);
const statusClasses: Record<ReportStatus, string> = {
    已生成: 'bg-[var(--success-soft)] text-emerald-700',
    生成中: 'bg-[var(--item-active-color)] text-[var(--primary-color)]',
    待生成: 'bg-[var(--warning-soft)] text-amber-700',
};
const statusIcons: Record<ReportStatus, string> = {
    已生成: 'ri-checkbox-circle-line',
    生成中: 'ri-loader-4-line animate-spin',
    待生成: 'ri-time-line',
};

const filters = reactive({ keyword: '', type: 'all', status: 'all' });
const activeFilters = reactive({ keyword: '', type: 'all', status: 'all' });
const page = ref(1);
const pageSize = 5;
const filteredReports = computed(() => {
    const keyword = activeFilters.keyword.trim().toLowerCase();
    return sourceReports.value.filter((report) => {
        const matchesKeyword =
            !keyword ||
            `${report.name}${report.owner}${report.code}`.toLowerCase().includes(keyword);
        return (
            matchesKeyword &&
            (activeFilters.type === 'all' || report.type === activeFilters.type) &&
            (activeFilters.status === 'all' || report.status === activeFilters.status)
        );
    });
});
const paginatedReports = computed(() =>
    filteredReports.value.slice((page.value - 1) * pageSize, page.value * pageSize)
);
watch(filteredReports, () => {
    const lastPage = Math.max(1, Math.ceil(filteredReports.value.length / pageSize));
    if (page.value > lastPage) page.value = lastPage;
});

const applyFilters = () => {
    Object.assign(activeFilters, filters);
    page.value = 1;
};
const resetFilters = () => {
    Object.assign(filters, { keyword: '', type: 'all', status: 'all' });
    applyFilters();
};
const refreshReports = () => window.$message?.success('报表列表已刷新');
const viewReport = (report: Report) => window.$message?.info(`正在查看：${report.name}`);

const createVisible = ref(false);
const submitting = ref(false);
const createFormRef = ref<FormInst | null>(null);
const emptyCreateForm = () => ({
    name: '',
    type: null as string | null,
    period: null as string | null,
    owner: '',
    description: '',
});
const createForm = reactive(emptyCreateForm());
const createRules: FormRules = {
    name: [{ required: true, message: '请输入报表名称', trigger: ['input', 'blur'] }],
    type: [{ required: true, message: '请选择报表类型', trigger: ['change', 'blur'] }],
    period: [{ required: true, message: '请选择统计周期', trigger: ['change', 'blur'] }],
    owner: [{ required: true, message: '请输入负责人', trigger: ['input', 'blur'] }],
};

const openCreateModal = () => {
    Object.assign(createForm, emptyCreateForm());
    createVisible.value = true;
};
const closeCreateModal = () => {
    if (submitting.value) return;
    createVisible.value = false;
    createFormRef.value?.restoreValidation();
};
const submitReport = async () => {
    if (submitting.value) return;
    try {
        await createFormRef.value?.validate();
        submitting.value = true;
        const now = new Date();
        sourceReports.value.unshift({
            id: Date.now(),
            name: createForm.name.trim(),
            code: `RPT-${now.getFullYear()}-${String(sourceReports.value.length + 1).padStart(4, '0')}`,
            type: createForm.type ?? '',
            period: createForm.period ?? '',
            owner: createForm.owner.trim(),
            status: '待生成',
            updatedAt: now.toLocaleString('zh-CN', { hour12: false }).replace(/\//g, '-'),
            icon: 'ri-file-chart-line',
        });
        resetFilters();
        createVisible.value = false;
        window.$message?.success('报表新增成功');
    } catch {
        window.$message?.warning('请完善必填信息');
    } finally {
        submitting.value = false;
    }
};
</script>
