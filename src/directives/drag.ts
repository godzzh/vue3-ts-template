import Drag from "@/utils/drag.js";

const dragDirective = {
    mounted(el: HTMLElement, binding: any) {
        new Drag(el, binding.value || {});
    },
};

export function setupDragDirective(app: any) {
    app.directive("drag", dragDirective);
}

export default setupDragDirective;
