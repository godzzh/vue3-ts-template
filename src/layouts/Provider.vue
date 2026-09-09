<template>
    <div :class="{ 'light-theme': !systemStore.sysTheme }">
        <n-config-provider
            :locale="naiveLocale"
            :date-locale="naiveDateLocale"
            :theme="systemStore.sysTheme ? darkTheme : null"
            :theme-overrides="systemStore.sysTheme ? darkThemeColor : lightThemeColor"
        >
            <n-global-style />
            <n-dialog-provider>
                <n-message-provider :duration="1500">
                    <n-notification-provider>
                        <n-loading-bar-provider>
                            <App />
                        </n-loading-bar-provider>
                    </n-notification-provider>
                </n-message-provider>
            </n-dialog-provider>
        </n-config-provider>
    </div>
</template>
<script setup lang="ts">
import { computed, watch } from 'vue';
import { darkTheme, zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui';
import App from '@/App.vue';
import useSystemStore from '@/stores/system';
import { lightThemeColor, darkThemeColor, darkStyle, lightStyle } from './theme';
import i18n from '@/i18n';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const systemStore = useSystemStore();

/* ---------- 语言：Naive UI locale / vue-i18n / dayjs 三方同步 ---------- */
const naiveLocale = computed(() => (systemStore.language === 'en-US' ? enUS : zhCN));
const naiveDateLocale = computed(() => (systemStore.language === 'en-US' ? dateEnUS : dateZhCN));

watch(
    () => systemStore.language,
    (lang) => {
        i18n.global.locale.value = lang;
        dayjs.locale(lang === 'en-US' ? 'en' : 'zh-cn');
    },
    { immediate: true }
);

/* ---------- 主题：CSS 变量 + theme-mode 属性统一在此应用 ---------- */
const applyThemeStyle = (style: Record<string, string>, isDark: boolean) => {
    const html = document.documentElement;
    // 先清掉两套主题的全部键，避免明暗切换时残留对方变量
    const allKeys = new Set([...Object.keys(lightStyle), ...Object.keys(darkStyle)]);
    allKeys.forEach((key) => html.style.removeProperty(key));
    for (const key in style) {
        html.style.setProperty(key, style[key] ?? '');
    }
    if (isDark) {
        html.setAttribute('theme-mode', 'dark');
    } else {
        html.removeAttribute('theme-mode');
    }
};

watch(
    () => systemStore.sysTheme,
    (newVal) => applyThemeStyle(newVal ? darkStyle : lightStyle, newVal),
    { immediate: true }
);
</script>
