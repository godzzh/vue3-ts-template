import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/layouts/BasicLayout/index.vue'),
            children: [
                {
                    path: '',
                    redirect: '/dashboard'
                },
                {
                    path: 'dashboard',
                    component: () => import('@/pages/Dashboard/index.vue')
                },
                {
                    path: 'alarm',
                    component: () => import('@/pages/Alarm/index.vue')
                },
                {
                    path: 'task',
                    component: () => import('@/pages/Task/index.vue')
                },
                {
                    path: 'algorithm',
                    component: () => import('@/pages/Algorithm/index.vue')
                },
                {
                    path: 'device',
                    component: () => import('@/pages/Device/index.vue')
                }
            ]
        },
        {
            path: '/home',
            component: () => import('@/pages/Home/index.vue')
        },
        {
            meta: {
                isRedirect: true,
            },
            path: '/redirect/:path(.*)',
            component: () => import('@/common/views/Redirect/index.vue'),
        },
    ]
})

export default router
