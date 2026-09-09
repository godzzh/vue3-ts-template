<template>
    <div
        class="min-h-dvh bg-[var(--bg-base)] pl-[248px] transition-[padding-left] duration-200 ease-in-out motion-reduce:transition-none max-[800px]:pl-0"
        :class="{ 'pl-[76px] max-[800px]:pl-0': systemStore.sidebarCollapsed }"
    >
        <a
            class="fixed left-3 top-3 z-[100] -translate-y-[160%] rounded-sm bg-[var(--primary-color)] px-4 py-2.5 text-white transition-transform duration-150 focus:translate-y-0"
            href="#main-content"
        >
            跳到主要内容
        </a>
        <SideNav :mobile-open="mobileMenuOpen" @close-mobile="mobileMenuOpen = false" />
        <button
            v-if="mobileMenuOpen"
            class="fixed inset-0 z-[45] hidden border-0 bg-slate-900/50 backdrop-blur-[3px] max-[800px]:block"
            type="button"
            aria-label="关闭菜单"
            @click="mobileMenuOpen = false"
        ></button>

        <div class="flex min-h-dvh min-w-0 flex-col">
            <TopNav @open-menu="mobileMenuOpen = true" />
            <main
                id="main-content"
                class="mx-auto min-h-[calc(100dvh-120px)] w-full max-w-[1600px] p-6 outline-none max-[800px]:p-4"
                tabindex="-1"
            >
                <router-view v-slot="{ Component, route }">
                    <transition name="fade-slide" mode="out-in">
                        <component :is="Component" :key="route.path" />
                    </transition>
                </router-view>
            </main>
            <footer
                class="mx-auto mb-0 mt-auto flex w-full max-w-[1600px] items-center justify-between px-6 py-4 text-[12px] text-[var(--text-color-muted)]"
            >
                <span>Vue Forge Admin</span>
                <span>Vue 3 · TypeScript · Naive UI</span>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SideNav from '@/layouts/SideNav/index.vue';
import TopNav from '@/layouts/TopNav/index.vue';
import useSystemStore from '@/stores/system';

const systemStore = useSystemStore();
const mobileMenuOpen = ref(false);
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition:
        opacity 160ms ease,
        transform 160ms ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(6.4px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-3.2px);
}

@media (prefers-reduced-motion: reduce) {
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: none;
    }
}
</style>
