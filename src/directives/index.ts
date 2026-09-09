import type { App } from 'vue';
import { setupLoadingDirective } from './loading';
import { setupPermissionDirective } from './auth';
import { setupDragDirective } from './drag';
import { setupRippleDirective } from './ripple';

export function setupGlobDirectives(app: App<Element>) {
    // v-loading 组件加载状态
    setupLoadingDirective(app);
    // v-auth 按钮权限（权限列表通过 setAuthList() 注入）
    setupPermissionDirective(app);
    // v-drag 拖拽组件
    setupDragDirective(app);
    // v-ripple 点击涟漪
    setupRippleDirective(app);
}
