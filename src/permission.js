import router from '@/router'
import '@/styles/NProgress.less'
import NProgress from 'nprogress'
// import useUserStore from '@/stores/user'
import useSystemStore from "@/stores/system"
import { isEmpty } from 'lodash'
import { useUrlSearchParams } from '@vueuse/core'
import { storeToRefs } from 'pinia'

let isFirst = true

//刷新页面时，重定向到当前页面，解决keep-alive组件输入问题
const redirectPath = (to, from, next) => {
    if (from.path === '/' && isFirst && to.meta.keepAlive) {
        isFirst = false
        next({
            path: '/redirect' + to.path,
            query: to.query,
            replace: true,
        })
    } else {
        next({ ...to, replace: true })
    }
}

//路由守卫
router.beforeEach((to, from, next) => {
    // const userStore = useUserStore()

    const { sysInfo } = storeToRefs(useSystemStore())

    const { title = '' } = to.meta
    document.title = `${title ? title + ' - ' : ''}${sysInfo.value.title}` //设置标题

    const { query } = to

    //带token自动登录
    if (query.token || query.Token || query.TOKEN) {
        localStorage.setItem('Token', query.token || query.Token || query.TOKEN)
        //hash路由和history路由，需要注意区分
        const _params = useUrlSearchParams('hash')
        delete _params.token
    }

    NProgress.start()

    let darkTheme = localStorage.getItem('darkTheme')
    if (darkTheme) {
        document.documentElement.setAttribute('theme-mode', 'dark')
    } else {
        document.documentElement.removeAttribute('theme-mode')
    }

    next()
    NProgress.done();
    return;

    //白名单
    // const white_list = ['login', 'errorLogin', 'register', '/404']
    // if (white_list.includes(to.name || to.path)) {
    //     next()
    //     NProgress.done()
    // } else {
    //     let userInfo = userStore.userInfo
    //     if (!isEmpty(userInfo)) {
    //         next()
    //         NProgress.done()
    //     } else {
    //         userStore
    //             .onGetUserInfo()
    //             .then((res) => {
    //                 if (res.code === 0 || res.code === 200) {
    //                     redirectPath(to, from, next)
    //                     NProgress.done()
    //                 } else {
    //                     //获取用户信息失败
    //                     userStore.Logout()
    //                     NProgress.done()
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //                 userStore.Logout()
    //                 NProgress.done()
    //             })
    //     }
    // }
})
