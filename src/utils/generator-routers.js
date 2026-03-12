import Layout from "@/layouts/BasicLayout/index.vue";
let routeModules = import.meta.glob("/src/pages/**/*.vue");

import { setConfig } from "@/config";

export const generator = (arr) => {
    arr.map((item) => {
        item.meta = {
            title: item.title,
            keepAlive: item.keepAlive,
            activeName: item.activeName || undefined,
        };
        if (item.children && item.children.length) {
            item.redirect = item.children[0].path;
        }
        if (item.component) {
            if (routeModules[`/src${item.component}.vue`]) {
                item.component = routeModules[`/src${item.component}.vue`];
            } else {
                //组件不存在时，给默认组件
                item.component = routeModules[`/src/pages/ErrorPage/err.vue`];
            }
        }

        if (item.children) generator(item.children);
        return item;
    });
    return arr;
};

// 根路由，设置basicLayout
const rootRouter = {
    path: "/BasicLayout",
    name: "BasicLayout",
    meta: {
        title: "主页",
    },
    component: Layout,
    redirect: "",
    children: [],
};

const pathMatch = {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
};

export const generatorDynamicRouter = async (data) => {
    const menuNav = data;
    let routers = [];
    const _routers = await generator(menuNav);
    rootRouter.children = _routers;
    rootRouter.redirect = data[0].path;
    //设置重定向页面
    setConfig("redirectPath", data[0].path);
    routers.push(rootRouter);
    routers.push(pathMatch);
    return routers;
};
