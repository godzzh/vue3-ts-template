<template>
    <header
        class="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-[var(--border-color)] bg-[color-mix(in_srgb,var(--bg-surface)_91%,transparent)] px-6 backdrop-blur-2xl max-[800px]:px-4"
    >
        <div class="flex items-center">
            <button
                class="mr-2 hidden size-10 place-items-center rounded-md border-0 bg-transparent text-xl text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97] max-[800px]:grid"
                type="button"
                aria-label="打开菜单"
                @click="emit('open-menu')"
            >
                <i class="ri-menu-2-line" aria-hidden="true"></i>
            </button>
            <nav class="flex items-center gap-1 text-xs" aria-label="面包屑">
                <router-link
                    class="text-[var(--text-color-muted)] no-underline hover:text-[var(--primary-color)]"
                    to="/dashboard"
                    >首页</router-link
                >
                <i
                    class="ri-arrow-right-s-line text-base text-[var(--text-color-muted)]"
                    aria-hidden="true"
                ></i>
                <span class="font-semibold text-[var(--text-color)]">{{ pageTitle }}</span>
            </nav>
        </div>

        <div class="flex items-center gap-1">
            <button
                class="flex h-[38.4px] min-w-40 items-center justify-start gap-2 rounded-md border border-[var(--border-color)] bg-[var(--bg-base)] px-2.5 text-xs text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97] max-[800px]:hidden"
                type="button"
                @click="showSearchHint"
            >
                <i class="ri-search-line" aria-hidden="true"></i>
                <span>搜索</span>
                <kbd
                    class="ml-auto rounded border border-[var(--border-color)] bg-[var(--bg-surface)] px-1.5 py-0.5 font-mono text-[12px] text-[var(--text-color-muted)]"
                    >⌘ K</kbd
                >
            </button>
            <button
                class="grid size-[38.4px] place-items-center rounded-md border-0 bg-transparent text-[17px] text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97] max-[800px]:hidden"
                type="button"
                aria-label="帮助中心"
            >
                <i class="ri-question-line" aria-hidden="true"></i>
            </button>
            <n-badge :value="3" :max="9" type="error">
                <button
                    class="grid size-[38.4px] place-items-center rounded-md border-0 bg-transparent text-[17px] text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97]"
                    type="button"
                    aria-label="通知"
                >
                    <i class="ri-notification-3-line" aria-hidden="true"></i>
                </button>
            </n-badge>
            <button
                class="grid size-[38.4px] place-items-center rounded-md border-0 bg-transparent text-[17px] text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97]"
                type="button"
                :aria-label="systemStore.sysTheme ? '切换到浅色模式' : '切换到深色模式'"
                @click="systemStore.toggleTheme()"
            >
                <i
                    :class="systemStore.sysTheme ? 'ri-sun-line' : 'ri-moon-line'"
                    aria-hidden="true"
                ></i>
            </button>
            <span
                class="mx-2 h-6 w-px bg-[var(--border-color)] max-[800px]:hidden"
                aria-hidden="true"
            ></span>
            <n-dropdown :options="userOptions" trigger="click" @select="handleUserAction">
                <button
                    class="flex items-center gap-2.5 rounded-md border-0 bg-transparent px-2 py-1.5 text-left text-[var(--text-color-secondary)] transition duration-150 hover:bg-[var(--hover-overlay)] hover:text-[var(--text-color)] active:scale-[0.97]"
                    type="button"
                    aria-label="打开用户菜单"
                >
                    <span
                        class="grid size-[33.6px] place-items-center rounded-[9.6px] bg-primary-500 text-xs font-semibold text-white shadow-primary"
                        >周</span
                    >
                    <span class="max-[800px]:hidden">
                        <strong
                            class="block text-xs font-semibold leading-tight text-[var(--text-color)]"
                            >周明远</strong
                        >
                        <small
                            class="mt-1 block text-[12px] leading-tight text-[var(--text-color-muted)]"
                            >系统管理员</small
                        >
                    </span>
                    <i class="ri-arrow-down-s-line" aria-hidden="true"></i>
                </button>
            </n-dropdown>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { DropdownOption } from 'naive-ui';
import useAuthStore from '@/stores/auth';
import useSystemStore from '@/stores/system';

const emit = defineEmits<{ 'open-menu': [] }>();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const systemStore = useSystemStore();
const pageTitle = computed(() =>
    typeof route.meta.title === 'string' ? route.meta.title : '控制台'
);

const renderIcon = (name: string) => () => h('i', { class: name });
const userOptions: DropdownOption[] = [
    { label: '个人中心', key: 'profile', icon: renderIcon('ri-user-3-line') },
    { label: '账户设置', key: 'settings', icon: renderIcon('ri-settings-3-line') },
    { type: 'divider', key: 'divider' },
    { label: '退出登录', key: 'logout', icon: renderIcon('ri-logout-box-r-line') },
];

const showSearchHint = () => window.$message?.info('全局搜索入口已预留');
const handleUserAction = async (key: string | number) => {
    if (key === 'logout') {
        authStore.logout();
        window.$message?.success('已安全退出');
        await router.replace('/login');
        return;
    }
    const messages: Record<string, string> = {
        profile: '个人中心入口已预留',
        settings: '账户设置入口已预留',
    };
    window.$message?.info(messages[String(key)] ?? '功能入口已预留');
};
</script>
