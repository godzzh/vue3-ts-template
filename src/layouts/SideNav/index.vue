<template>
    <aside
        class="sider fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col overflow-hidden border-r border-[var(--sider-border)] bg-[var(--sider-bg)] text-[var(--sider-text)] shadow-[0.75rem_0_2.5rem_var(--sider-shadow)] transition-[width,transform,color,background-color,border-color] duration-200 ease-in-out max-[800px]:w-[min(272px,82vw)] max-[800px]:-translate-x-[105%]"
        :class="{
            'w-[76px] max-[800px]:w-[min(272px,82vw)]': systemStore.sidebarCollapsed,
            'max-[800px]:translate-x-0': mobileOpen,
        }"
    >
        <router-link
            class="relative flex h-18 items-center gap-3 border-b border-[var(--sider-border)] px-4 text-[var(--sider-title)] no-underline"
            :class="{
                'justify-center gap-0 px-0 max-[800px]:justify-start max-[800px]:gap-3 max-[800px]:px-4':
                    systemStore.sidebarCollapsed,
            }"
            to="/dashboard"
            aria-label="返回分析页"
        >
            <span
                class="grid size-[42.4px] shrink-0 place-items-center rounded-[10px] bg-[var(--primary-color)] text-xl text-white shadow-[0_0.5rem_1.5rem_rgba(24,76,255,0.28)]"
            >
                <i class="ri-flashlight-fill" aria-hidden="true"></i>
            </span>
            <span
                class="min-w-0 whitespace-nowrap"
                :class="{ 'hidden max-[800px]:block': systemStore.sidebarCollapsed }"
            >
                <strong class="block overflow-hidden text-sm font-semibold text-ellipsis">
                    {{ systemStore.sysInfo.title }}
                </strong>
                <small
                    class="mt-0.5 block font-mono text-[12px] uppercase tracking-[0.08em] text-[var(--sider-text-muted)]"
                >
                    Admin Console
                </small>
            </span>
        </router-link>

        <nav
            class="relative flex-1 overflow-y-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="主菜单"
        >
            <n-menu
                :value="route.path"
                :options="menuOptions"
                :expanded-keys="expandedKeys"
                :collapsed="systemStore.sidebarCollapsed && !mobileOpen"
                :collapsed-width="76"
                :collapsed-icon-size="20"
                :indent="18"
                accordion
                @update:value="handleSelect"
                @update:expanded-keys="handleExpandedKeys"
            />
        </nav>

        <div class="relative border-t border-[var(--sider-border)] p-[11.2px] max-[800px]:hidden">
            <button
                class="mx-auto flex h-[41.6px] w-full items-center justify-center rounded-md border-0 bg-transparent p-0 text-[var(--sider-text-muted)] transition duration-200 hover:bg-[var(--sider-hover)] hover:text-[var(--primary-color)] active:scale-[0.985]"
                :class="{ 'w-[43.2px]': systemStore.sidebarCollapsed }"
                type="button"
                :aria-label="systemStore.sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
                @click="systemStore.toggleSidebar()"
            >
                <i
                    class="block w-[21.6px] text-center text-[17px] leading-none"
                    :class="
                        systemStore.sidebarCollapsed
                            ? 'ri-menu-fold-2-line'
                            : 'ri-menu-unfold-2-line'
                    "
                    aria-hidden="true"
                ></i>
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { h, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { MenuOption } from 'naive-ui';
import useSystemStore from '@/stores/system';

defineProps<{ mobileOpen: boolean }>();
const emit = defineEmits<{ 'close-mobile': [] }>();

const route = useRoute();
const router = useRouter();
const systemStore = useSystemStore();

const renderIcon = (icon: string) => () => h('i', { class: icon, 'aria-hidden': 'true' });
const renderLabel = (label: string, badge?: number) =>
    badge === undefined
        ? label
        : () =>
              h('span', { class: 'menu-label-with-badge' }, [
                  h('span', label),
                  h('em', { 'aria-label': `${badge} 条待处理` }, String(badge)),
              ]);

const menuOptions: MenuOption[] = [
    {
        label: '概览中心',
        key: 'overview',
        icon: renderIcon('ri-dashboard-3-line'),
        children: [
            { label: '分析页', key: '/dashboard', icon: renderIcon('ri-line-chart-line') },
            {
                label: renderLabel('工作台', 6),
                key: '/workspace',
                icon: renderIcon('ri-layout-grid-line'),
            },
        ],
    },
    {
        label: '数据中心',
        key: 'data',
        icon: renderIcon('ri-database-2-line'),
        children: [
            { label: '数据报表', key: '/reports', icon: renderIcon('ri-bar-chart-box-line') },
        ],
    },
    {
        label: '系统管理',
        key: 'system',
        icon: renderIcon('ri-settings-3-line'),
        children: [
            { label: '用户管理', key: '/users', icon: renderIcon('ri-team-line') },
            {
                label: '权限配置',
                key: '/permissions',
                icon: renderIcon('ri-shield-keyhole-line'),
            },
            { label: '系统设置', key: '/settings', icon: renderIcon('ri-tools-line') },
        ],
    },
];

const routeGroupMap: Record<string, string> = {
    '/dashboard': 'overview',
    '/workspace': 'overview',
    '/reports': 'data',
    '/users': 'system',
    '/permissions': 'system',
    '/settings': 'system',
};
const expandedKeys = ref<string[]>([routeGroupMap[route.path] ?? 'overview']);

watch(
    () => route.path,
    (path) => {
        const groupKey = routeGroupMap[path];
        if (groupKey && !expandedKeys.value.includes(groupKey)) expandedKeys.value = [groupKey];
    }
);

const handleSelect = (key: string) => {
    if (key.startsWith('/')) void router.push(key);
    emit('close-mobile');
};

const handleExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys;
};
</script>

<style scoped>
.sider::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 25% 0, var(--sider-brand-glow), transparent 288px);
    content: '';
}

:deep(.n-menu) {
    --n-item-text-color: var(--sider-text) !important;
    --n-item-text-color-hover: var(--primary-color) !important;
    --n-item-text-color-active: var(--primary-color) !important;
    --n-item-text-color-child-active: var(--primary-color) !important;
    --n-item-icon-color: var(--sider-text-muted) !important;
    --n-item-icon-color-hover: var(--primary-color) !important;
    --n-item-icon-color-active: var(--primary-color) !important;
    --n-item-icon-color-child-active: var(--primary-color) !important;
    --n-arrow-color: var(--sider-text-muted) !important;
    --n-arrow-color-hover: var(--primary-color) !important;
    --n-arrow-color-active: var(--primary-color) !important;
    --n-item-color-hover: var(--sider-hover) !important;
    --n-item-color-active: var(--sider-parent-active) !important;
    --n-item-color-active-hover: var(--sider-parent-active) !important;
    --n-item-border-radius: 6px !important;
}

:deep(.n-menu-item-content) {
    margin-inline: 11.2px;
}

:deep(.n-menu-item-content::before) {
    left: 0;
    right: 0;
}

:deep(.n-menu-item-content__icon) {
    font-size: 17px;
}

:deep(.n-menu--collapsed .n-menu-item-content) {
    margin-inline: 0;
}

:deep(.menu-label-with-badge) {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

:deep(.menu-label-with-badge em) {
    display: grid;
    min-width: 19.2px;
    height: 19.2px;
    padding-inline: 4.8px;
    place-items: center;
    border-radius: 4px;
    color: var(--primary-color);
    background: var(--sider-parent-active);
    font-family: 'Fira Code', monospace;
    font-size: 12px;
    font-style: normal;
}
</style>
