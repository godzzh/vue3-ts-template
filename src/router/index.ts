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
                meta: { title: '分析页', icon: 'ri-dashboard-3-line' },
                component: () => import('@/pages/Home/index.vue'),
            },
            {
                path: 'workspace',
                name: 'Workspace',
                meta: { title: '工作台', icon: 'ri-layout-grid-line' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'users',
                name: 'Users',
                meta: { title: '用户管理', icon: 'ri-team-line' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'permissions',
                name: 'Permissions',
                meta: { title: '权限配置', icon: 'ri-shield-keyhole-line' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'reports',
                name: 'Reports',
                meta: { title: '数据报表', icon: 'ri-bar-chart-box-line' },
                component: () => import('@/pages/Placeholder/index.vue'),
            },
            {
                path: 'settings',
                name: 'Settings',
                meta: { title: '系统设置', icon: 'ri-settings-3-line' },
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
