import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
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
