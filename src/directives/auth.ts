// import { useUserStore } from "@/store/user";

function isAuth(el: HTMLElement, binding: any) {
    // const { authList } = useUserStore();

    // const value = binding.value;
    // if (!value) return;
    // if (!authList.includes(value)) {
    //     el.parentNode?.removeChild(el);
    // }
}

const mounted = (el: HTMLElement, binding: any) => {
    isAuth(el, binding);
};

const authDirective = {
    mounted,
};

export function setupPermissionDirective(app: any) {
    app.directive("auth", authDirective);
}

export default authDirective;
