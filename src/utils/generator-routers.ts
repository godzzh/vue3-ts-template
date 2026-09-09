import type { RouteRecordRaw } from 'vue-router';

const routeModules = import.meta.glob('/src/pages/**/*.vue');

type ComponentLoader = () => Promise<unknown>;

interface RouteItem {
    path: string;
    name?: string;
    title?: string;
    keepAlive?: boolean;
    activeName?: string;
    children?: RouteItem[];
    component?: string | ComponentLoader;
    redirect?: string;
    meta?: {
        title?: string;
        keepAlive?: boolean;
        activeName?: string;
        isRedirect?: boolean;
    };
}

const pathMatch: RouteRecordRaw = {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
};

export const generator = (arr: RouteItem[]): RouteItem[] => {
    arr.map((item) => {
        item.meta = {
            title: item.title,
            keepAlive: item.keepAlive,
            activeName: item.activeName,
        };
        if (item.children && item.children.length) {
            item.redirect = item.children[0]?.path;
        }
        if (item.component && typeof item.component === 'string') {
            const componentPath = `/src${item.component}.vue`;
            if (routeModules[componentPath]) {
                item.component = routeModules[componentPath] as ComponentLoader;
            } else {
                // 找不到页面组件时回退到 404 页（该文件位于 pages 目录下，可被 glob 命中）
                item.component = routeModules['/src/pages/ErrorPage/index.vue'] as ComponentLoader;
            }
        }

        if (item.children) generator(item.children);
        return item;
    });
    return arr;
};

export const setConfig = (key: string, value: unknown): void => {
    window.___CONFIG ??= {};
    window.___CONFIG[key] = value;
};

export const getConfig = (key: string): unknown => window.___CONFIG?.[key];

/**
 * 由后端菜单数据生成动态路由。
 * 注意：当前模板的静态路由中暂未接入该函数（无后端菜单接口），
 * 接入方式：登录后请求菜单 -> generatorDynamicRouter(menus) -> router.addRoute()。
 */
export const generatorDynamicRouter = (data: RouteItem[]): RouteRecordRaw[] => {
    const _routers = generator(data);

    const LayoutComponent = () => import('@/layouts/BasicLayout/index.vue');

    const rootRouter: RouteRecordRaw = {
        path: '/BasicLayout',
        name: 'BasicLayout',
        meta: {
            title: '主页',
        },
        component: LayoutComponent,
        redirect: data[0]?.path || '/',
        children: _routers as RouteRecordRaw[],
    };

    setConfig('redirectPath', data[0]?.path);

    return [rootRouter, pathMatch];
};
