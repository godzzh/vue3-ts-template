import { createLoading } from "@/common/Loading/index.js";

const loadingDirective = {
    mounted(el: any, binding: any) {
        const tip = el.getAttribute("loading-tip");
        const background = el.getAttribute("loading-background");
        const size = el.getAttribute("loading-size");
        const fullscreen = !!binding.modifiers.fullscreen;
        const instance = createLoading(
            {
                tip: tip,
                background,
                size: size || "medium",
                loading: !!binding.value?.value,
                absolute: !fullscreen,
            },
            fullscreen ? document.body : el
        );
        el.instance = instance;
    },

    updated(el: any, binding: any) {
        const instance = el.instance;
        if (!instance) return;
        // instance.setTip(el.getAttribute("loading-tip"));
        if (binding.oldValue !== binding.value) {
            instance.setLoading?.(binding.value);
        }
    },

    unmounted(el: any) {
        el?.instance?.close();
    },
};

export function setupLoadingDirective(app: any) {
    app.directive("loading", loadingDirective);
}

export default loadingDirective;
