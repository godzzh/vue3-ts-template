import router from '@/router';
import useAuthStore from '@/stores/auth';
import useSystemStore from '@/stores/system';

const queryTokenEnabled = import.meta.env.DEV;

router.beforeEach((to) => {
    const systemStore = useSystemStore();
    const authStore = useAuthStore();
    const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : '';
    document.title = pageTitle
        ? `${pageTitle} · ${systemStore.sysInfo.title}`
        : systemStore.sysInfo.title;

    if (queryTokenEnabled) {
        const token = [to.query.token, to.query.Token, to.query.TOKEN].find(
            (value): value is string => typeof value === 'string' && value.length > 0
        );
        if (token) {
            authStore.login(token);
            const query = { ...to.query };
            delete query.token;
            delete query.Token;
            delete query.TOKEN;
            return { path: to.path, query, hash: to.hash, replace: true };
        }
    }

    authStore.syncToken();
    if (to.meta.public === true) {
        if (to.path === '/login' && authStore.isAuthenticated) return '/dashboard';
        return true;
    }
    if (!authStore.isAuthenticated) {
        return {
            path: '/login',
            query: to.fullPath === '/' ? undefined : { redirect: to.fullPath },
        };
    }
    return true;
});
