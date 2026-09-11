import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        meta: { title: '登录', public: true },
        component: () => import('@/pages/Login/index.vue'),
    },
    {
        path: '/',
        component: () => import('@/layouts/BasicLayout/index.vue'),
        children: [
            { path: '', redirect: '/dashboard' },
            {
                path: 'dashboard',
                name: 'Dashboard',
                meta: { title: '分析页', icon: 'dashboard' },
                component: () => import('@/pages/Home/index.vue'),
            },
            {
                path: 'workspace',
                name: 'Workspace',
                meta: { title: '工作台', icon: 'workspace' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'users',
                name: 'Users',
                meta: { title: '用户管理', icon: 'users' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'permissions',
                name: 'Permissions',
                meta: { title: '权限配置', icon: 'permissions' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'reports',
                name: 'Reports',
                meta: { title: '数据报表', icon: 'reports' },
                component: () => import('@/pages/Reports/index.vue'),
            },
            {
                path: 'settings',
                name: 'Settings',
                meta: { title: '系统设置', icon: 'settings' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
        ],
    },
    {
        meta: { title: '页面跳转', isRedirect: true },
        path: '/redirect/:path(.*)',
        component: () => import('@/common/views/Redirect/index.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: { title: '页面未找到' },
        component: () => import('@/pages/ErrorPage/index.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});

export default router;
