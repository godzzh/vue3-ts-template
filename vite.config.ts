import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'

const proxyUrl = 'http://192.168.0.112:8857/duty-service-provider'

export default defineConfig({
    build: {
        outDir: 'dist',
        assetsDir: 'static',
        target: ['chrome78'],
        chunkSizeWarningLimit: 1000,
        sourcemap: false,
        cssCodeSplit: true,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true, //打包时删除 debugger
            },
            output: {
                comments: true, // 去掉注释内容
            },
        },
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return

                    // Vue 核心生态
                    if (/node_modules\/(@vue|vue|vue-router|pinia|vue-i18n)\//.test(id)) {
                        return 'vue-vendor'
                    }
                    // Naive UI 组件库
                    if (/node_modules\/naive-ui\//.test(id)) {
                        return 'naive-ui'
                    }
                    // ECharts 图表库
                    if (/node_modules\/echarts\//.test(id)) {
                        return 'echarts'
                    }
                    // lodash 工具库
                    if (/node_modules\/lodash\//.test(id)) {
                        return 'lodash'
                    }
                    // 其他第三方库合并为一个 chunk
                    const match = id.toString().split('node_modules/')[1]?.split('/')[0]
                    if (match) {
                        return `vendor-${match}`
                    }
                },
            },
        },
        reportCompressedSize: false
    },
    optimizeDeps: {
        include: [
            'naive-ui',
            'vue',
            'vue-router',
            'pinia',
            'vue-i18n',
            'echarts',
            'lodash',
            '@vueuse/core',
        ],
    },
    base: './',
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    plugins: [
        vue(),
        vueJsx(),
        viteCompression(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            'vue': 'vue/dist/vue.esm-bundler.js',
        },
    },
    server: {
        port: 3031,
        host: '0.0.0.0',
        open: true,
        hmr: {
            overlay: true,
        },
        proxy: {
            '/duty-service-provider': {
                target: proxyUrl,
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/duty-service-provider/, '')
            },
        },
    },
})
