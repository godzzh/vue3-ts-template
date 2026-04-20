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
                    component: () => import('@/pages/Dashboard/index.vue'),
                    meta: {
                        title: '首页',
                    }
                },
                {
                    path: 'alarm',
                    component: () => import('@/pages/Alarm/index.vue'),
                    meta: {
                        title: '告警中心',
                    }
                },
                {
                    path: 'task',
                    component: () => import('@/pages/Task/index.vue'),
                    meta: {
                        title: '任务中心',
                    }
                },
                {
                    path: 'algorithm',
                    component: () => import('@/pages/Algorithm/index.vue'),
                    meta: {
                        title: '算法中心',
                    }
                },
                {
                    path: 'device',
                    component: () => import('@/pages/Device/index.vue'),
                    meta: {
                        title: '设备中心',
                    }
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
