<template>
    <section
        class="grid min-h-[calc(100dvh-160px)] place-content-center justify-items-center text-center text-[var(--text-color-secondary)]"
    >
        <div
            class="grid size-18 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--primary-color)_10%,var(--bg-surface))] text-3xl text-[var(--primary-color)]"
            aria-hidden="true"
        >
            <component :is="icon" class="size-8" />
        </div>
        <p
            class="mb-1.5 mt-6 font-mono text-[12px] uppercase tracking-[0.1em] text-[var(--text-color-muted)]"
        >
            Module scaffold
        </p>
        <h1 class="m-0 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-color)]">
            {{ title }}
        </h1>
        <span class="mt-3 text-sm">页面入口和布局已接入，可在此开始编写业务模块。</span>
        <router-link
            class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary-color)] no-underline"
            to="/dashboard"
        >
            <RiArrowLeftLine class="size-4" aria-hidden="true" />
            返回分析页
        </router-link>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    RiApps2Line,
    RiArrowLeftLine,
    RiBarChartBoxLine,
    RiDashboard3Line,
    RiLayoutGridLine,
    RiSettings3Line,
    RiShieldKeyholeLine,
    RiTeamLine,
} from '@remixicon/vue';

const route = useRoute();
const title = computed(() =>
    typeof route.meta.title === 'string' ? route.meta.title : '业务模块'
);
const routeIcons = {
    dashboard: RiDashboard3Line,
    workspace: RiLayoutGridLine,
    users: RiTeamLine,
    permissions: RiShieldKeyholeLine,
    reports: RiBarChartBoxLine,
    settings: RiSettings3Line,
} as const;
const icon = computed(() => {
    const name = typeof route.meta.icon === 'string' ? route.meta.icon : '';
    return routeIcons[name as keyof typeof routeIcons] ?? RiApps2Line;
});
</script>
