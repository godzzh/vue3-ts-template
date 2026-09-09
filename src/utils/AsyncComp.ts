import { defineAsyncComponent, type Component } from 'vue';
import Loading from '@/common/Loading/index.vue';

/** 异步组件包装：加载期间展示全局 Loading 组件 */
const AsyncComp = (loader: () => Promise<Component>) => {
    return defineAsyncComponent({
        loader,
        loadingComponent: Loading,
        delay: 0,
    });
};

export default AsyncComp;
