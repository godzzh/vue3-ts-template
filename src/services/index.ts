import type { ApiMethod } from '@/types/injection-keys';

const modules = import.meta.glob('./*.ts', { eager: true }) as Record<
    string,
    Record<string, unknown>
>;

// 平铺合并各服务的具名导出为统一 API 对象（与文档 global.$api.xxx 用法一致）
const api: Record<string, unknown> = {};

for (const key in modules) {
    const mod = modules[key] || {};
    for (const name of Object.keys(mod)) {
        if (name === 'default') continue;
        if (import.meta.env.DEV && name in api) {
            console.warn(`[services] 接口名重复，后注册的将覆盖前者: ${name} (${key})`);
        }
        api[name] = mod[name];
    }
}

export default api as Record<string, ApiMethod>;
