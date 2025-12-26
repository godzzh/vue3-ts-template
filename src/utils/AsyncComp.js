import { defineAsyncComponent } from "vue";
import Loading from "@/common/Loading/index.vue";

//异步组件
const AsyncComp = (component) => {
    return defineAsyncComponent({
        loader: component,
        loadingComponent: Loading,
        delay: 2000,
    });
};

export default AsyncComp;
