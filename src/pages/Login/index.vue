<template>
    <main
        class="relative min-h-dvh overflow-hidden bg-[var(--login-bg)] text-[var(--login-title)] transition-colors duration-300"
    >
        <div class="pointer-events-none absolute inset-0">
            <div
                class="absolute -left-32 -top-32 size-[32rem] rounded-full bg-primary-500/[0.08] blur-3xl"
            ></div>
            <div
                class="absolute -bottom-48 right-[-8rem] size-[38rem] rounded-full bg-[var(--login-orb)] blur-3xl"
            ></div>
            <div class="login-grid absolute inset-0 opacity-50"></div>
        </div>

        <header class="relative z-10 flex h-20 items-center justify-between px-8 max-[640px]:px-5">
            <router-link
                class="flex items-center gap-3 text-[var(--login-title)] no-underline"
                to="/login"
            >
                <span
                    class="grid size-10 place-items-center rounded-lg bg-primary-500 text-xl text-white shadow-primary"
                >
                    <i class="ri-flashlight-fill" aria-hidden="true"></i>
                </span>
                <span
                    ><strong class="block text-sm font-semibold">{{
                        systemStore.sysInfo.title
                    }}</strong
                    ><small
                        class="block font-mono text-[0.58rem] uppercase tracking-[0.12em] text-[var(--login-muted)]"
                        >Enterprise Console</small
                    ></span
                >
            </router-link>
            <button
                class="grid size-10 place-items-center rounded-md border border-[var(--login-border-soft)] bg-[var(--login-surface-soft)] text-lg text-[var(--login-text)] backdrop-blur transition hover:border-primary-400 hover:text-primary-500"
                type="button"
                :aria-label="systemStore.sysTheme ? '切换到浅色模式' : '切换到深色模式'"
                @click="systemStore.toggleTheme()"
            >
                <i
                    :class="systemStore.sysTheme ? 'ri-sun-line' : 'ri-moon-line'"
                    aria-hidden="true"
                ></i>
            </button>
        </header>

        <div
            class="relative z-10 mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[90rem] grid-cols-[minmax(0,1.15fr)_minmax(25rem,0.72fr)] items-center gap-20 px-12 pb-20 max-[960px]:grid-cols-1 max-[960px]:place-items-center max-[960px]:px-5"
        >
            <section class="max-w-2xl max-[960px]:hidden">
                <span
                    class="inline-flex items-center gap-2 rounded-full border border-[var(--login-border)] bg-[var(--login-surface-soft)] px-3 py-1.5 font-mono text-[0.65rem] text-primary-500 shadow-sm backdrop-blur"
                    ><i class="ri-shield-check-line text-sm"></i>Vue 3 Enterprise Scaffold</span
                >
                <h1
                    class="mt-8 text-[clamp(2.8rem,5vw,5.2rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-[var(--login-title)]"
                >
                    专注业务，<br /><span class="text-primary-500">构建可靠系统。</span>
                </h1>
                <p class="mt-7 max-w-xl text-base leading-8 text-[var(--login-text)]">
                    开箱即用的企业后台基础设施，集成权限路由、主题系统、数据可视化与工程质量基线。
                </p>
                <div class="mt-10 grid grid-cols-3 gap-3">
                    <div
                        v-for="feature in features"
                        :key="feature.label"
                        class="border-l border-[var(--login-border-soft)] pl-4"
                    >
                        <i :class="feature.icon" class="text-xl text-primary-500"></i
                        ><strong
                            class="mt-3 block text-xs font-semibold text-[var(--login-title)]"
                            >{{ feature.label }}</strong
                        ><small class="mt-1 block text-[0.65rem] text-[var(--login-muted)]">{{
                            feature.note
                        }}</small>
                    </div>
                </div>
            </section>

            <section
                class="w-full max-w-[28rem] rounded-xl border border-[var(--login-border)] bg-[var(--login-surface)] p-9 shadow-[var(--login-shadow)] backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 max-[480px]:p-6"
            >
                <div>
                    <p
                        class="m-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary-500"
                    >
                        Welcome back
                    </p>
                    <h2
                        class="mb-0 mt-2 text-2xl font-semibold tracking-[-0.035em] text-[var(--login-title)]"
                    >
                        登录管理后台
                    </h2>
                    <p class="mb-0 mt-2 text-xs text-[var(--login-muted)]">
                        请输入账号信息继续访问工作台
                    </p>
                </div>

                <form class="mt-8" @submit.prevent="handleLogin">
                    <n-form-item path="username" label="账号">
                        <n-input
                            v-model:value="form.username"
                            placeholder="请输入账号"
                            autocomplete="username"
                            clearable
                            ><template #prefix
                                ><i class="ri-user-3-line text-[var(--login-muted)]"></i></template
                        ></n-input>
                    </n-form-item>
                    <n-form-item path="password" label="密码">
                        <n-input
                            v-model:value="form.password"
                            type="password"
                            show-password-on="click"
                            autocomplete="current-password"
                            placeholder="请输入密码"
                            ><template #prefix
                                ><i class="ri-lock-2-line text-[var(--login-muted)]"></i></template
                        ></n-input>
                    </n-form-item>
                    <div class="mb-6 flex items-center justify-between text-xs">
                        <n-checkbox v-model:checked="form.remember">记住账号</n-checkbox
                        ><button
                            class="border-0 bg-transparent text-primary-500"
                            type="button"
                            @click="showDemoHint"
                        >
                            忘记密码？
                        </button>
                    </div>
                    <button
                        class="flex h-10 w-full items-center justify-center rounded-md border border-primary-500 bg-primary-500 px-4 text-sm font-medium text-white shadow-primary transition hover:bg-primary-600 disabled:cursor-wait disabled:opacity-70"
                        type="submit"
                        :disabled="submitting"
                    >
                        <i v-if="submitting" class="ri-loader-4-line mr-1 animate-spin"></i>
                        登录 <i v-if="!submitting" class="ri-arrow-right-line ml-1"></i>
                    </button>
                </form>

                <div
                    class="mt-6 flex items-start gap-2 rounded-md border border-[var(--login-hint-border)] bg-[var(--login-hint-bg)] px-3 py-2.5 text-[0.68rem] leading-5 text-[var(--login-text)]"
                >
                    <i class="ri-information-line mt-0.5 text-primary-500"></i
                    ><span
                        >模板演示账号：<b class="font-mono text-[var(--login-title)]">admin</b
                        >，密码：<b class="font-mono text-[var(--login-title)]">123456</b></span
                    >
                </div>
            </section>
        </div>

        <footer
            class="absolute bottom-5 left-0 right-0 z-10 text-center text-[0.65rem] text-[var(--login-muted)]"
        >
            Vue Forge Admin · Security by design
        </footer>
    </main>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useAuthStore from '@/stores/auth';
import useSystemStore from '@/stores/system';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const systemStore = useSystemStore();
const submitting = ref(false);
const rememberedUsername = localStorage.getItem('rememberedUsername') ?? 'admin';
const form = reactive({ username: rememberedUsername, password: '123456', remember: true });
const features = [
    { icon: 'ri-route-line', label: '权限路由', note: 'Route Ready' },
    { icon: 'ri-palette-line', label: '双主题', note: 'Theme System' },
    { icon: 'ri-code-box-line', label: '类型安全', note: 'Strict TypeScript' },
];

const showDemoHint = () => window.$message?.info('演示环境请使用页面提供的账号密码');
const handleLogin = async () => {
    if (submitting.value) return;
    try {
        if (!form.username || !form.password) {
            window.$message?.warning('请输入账号和密码');
            return;
        }
        if (form.username !== 'admin' || form.password !== '123456') {
            window.$message?.error('账号或密码错误');
            return;
        }
        submitting.value = true;
        if (form.remember) localStorage.setItem('rememberedUsername', form.username);
        else localStorage.removeItem('rememberedUsername');
        authStore.login();
        window.$message?.success('登录成功');
        const redirect =
            typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
                ? route.query.redirect
                : '/dashboard';
        await router.replace(redirect);
    } finally {
        submitting.value = false;
    }
};
</script>

<style scoped>
.login-grid {
    background-image:
        linear-gradient(var(--login-grid) 1px, transparent 1px),
        linear-gradient(90deg, var(--login-grid) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: linear-gradient(to bottom, black, transparent 82%);
}
</style>
