<template>
    <div :class="{ 'light-theme': !systemStore.sysTheme }">
        <n-config-provider
            :locale="zhCN"
            :date-locale="dateZhCN"
            :theme="systemStore.sysTheme ? darkTheme : null"
            :theme-overrides="systemStore.sysTheme ? darkThemeColor : lightThemeColor"
        >
            <n-global-style />
            <n-dialog-provider>
                <n-message-provider>
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
import { darkTheme } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import App from '@/App.vue'
import useSystemStore from '@/stores/system'
import { lightThemeColor, darkThemeColor, darkStyle, lightStyle } from './theme'
import { watch } from 'vue'

const systemStore = useSystemStore()

watch(
    () => systemStore.sysTheme,
    (newVal) => {
        let html = document.getElementById('htmlRoot')
        let style = lightStyle
        if (newVal) style = darkStyle
        for (let key in style) {
            html.style.setProperty(key, style[key])
        }
    },
    {
        deep: true,
        immediate: true,
    },
)
</script>
