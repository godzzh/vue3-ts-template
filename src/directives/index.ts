import { setupLoadingDirective } from "./loading";
import { setupPermissionDirective } from "./auth";
import { setupDragDirective } from "./drag";
import { setupRippleDirective } from "./ripple";

export function setupGlobDirectives(app) {
    //v-loading 组件加载状态
    setupLoadingDirective(app);
    //v-auth 按钮权限 和 store/user authList 配合使用
    setupPermissionDirective(app);
    //v-drag拖拽组件
    setupDragDirective(app);
    setupRippleDirective(app);
}
