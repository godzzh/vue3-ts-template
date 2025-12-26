import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import EnhanceLog from 'vite-plugin-enhance-log'
import viteCompression from 'vite-plugin-compression'

const proxyUrl = 'http://192.168.0.73'

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
                    if (id.includes('node_modules')) {
                        // 让每个插件都打包成独立的文件
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                },
            },
        },
        reportCompressedSize: false
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
        EnhanceLog({
            splitBy: ';',
        }),
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
            '/keer-api': {
                target: proxyUrl,
                changeOrigin: true,
                rewrite: (p) => p.replace(/^\/keer-api/, '')
            },
            // springdoc proxy
            '^/v3/api-docs/(.*)': {
                target: proxyUrl,
                changeOrigin: true,
            }
        },
    },
})
