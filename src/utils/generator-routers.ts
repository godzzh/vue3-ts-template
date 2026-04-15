import type { RouteRecordRaw } from "vue-router";

const routeModules = import.meta.glob("/src/pages/**/*.vue");

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
    path: "/:pathMatch(.*)*",
    redirect: "/404",
};

export const generator = (arr: RouteItem[]): RouteItem[] => {
    arr.map((item) => {
        item.meta = {
            title: item.title,
            keepAlive: item.keepAlive,
            activeName: item.activeName,
        };
        if (item.children && item.children.length) {
            item.redirect = item.children[0].path;
        }
        if (item.component && typeof item.component === "string") {
            const componentPath = `/src${item.component}.vue`;
            if (routeModules[componentPath]) {
                item.component = routeModules[componentPath] as ComponentLoader;
            } else {
                item.component = routeModules[
                    `/src/pages/ErrorPage/err.vue`
                ] as ComponentLoader;
            }
        }

        if (item.children) generator(item.children);
        return item;
    });
    return arr;
};

export const setConfig = (key: string, value: unknown): void => {
    (window as any).___CONFIG = (window as any).___CONFIG || {};
    ((window as any).___CONFIG as Record<string, unknown>)[key] = value;
};

export const getConfig = (key: string): unknown => {
    return ((window as any).___CONFIG as Record<string, unknown>)?.[key];
};

export const generatorDynamicRouter = async (
    data: RouteItem[]
): Promise<RouteRecordRaw[]> => {
    const menuNav = data;
    const _routers = await generator(menuNav);

    // Dynamic import for Layout component
    const LayoutComponent = () => import("@/layouts/BasicLayout/index.vue");

    const rootRouter: RouteRecordRaw = {
        path: "/BasicLayout",
        name: "BasicLayout",
        meta: {
            title: "主页",
        },
        component: LayoutComponent,
        redirect: data[0]?.path || "/",
        children: _routers as RouteRecordRaw[],
    };

    setConfig("redirectPath", data[0]?.path);

    return [rootRouter, pathMatch];
};
