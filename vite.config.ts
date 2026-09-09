import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ mode }) => {
    // 环境变量从 .env.[mode] 文件读取（代理地址不再硬编码）
    const env = loadEnv(mode, process.cwd());

    const proxyUrl = 'http://localhost:8080';

    return {
        build: {
            outDir: 'dist',
            assetsDir: 'static',
            target: ['chrome78'],
            chunkSizeWarningLimit: 1000,
            sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
            cssCodeSplit: true,
            // 显式指定 terser，使下方 terserOptions 生效
            // （rolldown-vite 默认使用 oxc 压缩，不会读取 terserOptions）
            minify: 'terser',
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true, // 打包时删除 console/debugger
                },
                format: {
                    comments: false, // 移除注释
                },
            },
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (!id.includes('node_modules')) return;

                        // Vue 核心生态
                        if (/node_modules\/(@vue|vue|vue-router|pinia|vue-i18n)\//.test(id)) {
                            return 'vue-vendor';
                        }
                        // Naive UI 组件库
                        if (/node_modules\/naive-ui\//.test(id)) {
                            return 'naive-ui';
                        }
                        // ECharts 图表库
                        if (/node_modules\/echarts\//.test(id)) {
                            return 'echarts';
                        }
                        // 其余三方库合并为一个 vendor，
                        // 避免逐包拆分产生大量小 chunk（HTTP 请求数反而劣化）
                        return 'vendor';
                    },
                },
            },
            reportCompressedSize: false,
        },
        optimizeDeps: {
            include: ['naive-ui', 'vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
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
            // 模板中 n-xxx 组件自动按需引入（配合移除 main.ts 的全量 app.use(naive)）
            Components({
                resolvers: [NaiveUiResolver()],
            }),
            viteCompression(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            port: 3031,
            host: '0.0.0.0',
            open: false,
            hmr: {
                overlay: true,
            },
            proxy: {
                '/api': {
                    target: proxyUrl,
                    changeOrigin: true,
                },
            },
        },
    };
});
