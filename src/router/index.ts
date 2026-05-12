import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
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
