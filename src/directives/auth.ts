/**
 * v-auth 按钮权限指令
 * - v-auth="'btn:add'" 或 v-auth="['btn:add', 'btn:edit']"（任一命中即通过）
 * - 权限列表由登录后调用 setAuthList() 注入（来自用户信息接口）
 */

let authList: string[] = [];

/** 注入权限码列表（通常在获取用户信息后调用） */
export function setAuthList(list: string[]) {
    authList = list;
}

/** 获取当前权限码列表 */
export function getAuthList(): string[] {
    return authList;
}

function isAuth(el: HTMLElement, binding: { value?: string | string[] }) {
    const value = binding.value;
    if (!value) return;
    const required = Array.isArray(value) ? value : [value];
    const hasAuth = required.some((code) => authList.includes(code));
    if (!hasAuth) {
        el.parentNode?.removeChild(el);
    }
}

const mounted = (el: HTMLElement, binding: { value?: string | string[] }) => {
    isAuth(el, binding);
};

const authDirective = {
    mounted,
};

export function setupPermissionDirective(app: any) {
    app.directive('auth', authDirective);
}

export default authDirective;
