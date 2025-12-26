import { defineComponent, createVNode, reactive, h, render } from "vue";
import Loading from "./index.vue";

export function createLoading(props, target, wait = false) {
    let vm = null;
    const data = reactive({
        loading: false,
        ...props,
    });

    const LoadingWrap = defineComponent({
        render() {
            return h(Loading, { ...data });
        },
    });

    vm = createVNode(LoadingWrap);

    if (wait) {
        setTimeout(() => {
          render(vm, document.createElement('div'));
        }, 0);
      } else {
        render(vm, document.createElement('div'));
      }

    function close() {
        if (vm?.el && vm.el.parentNode) {
            vm.el.parentNode.removeChild(vm.el);
        }
    }

    function open(target) {
        if (!vm || !vm.el) {
            return;
        }
        //设置容器定位
        let _position = window.getComputedStyle(target).position;
        if(_position != 'fixed' && _position != 'sticky' && _position != 'relative') {
            target.style.position = 'relative';
        }
        target.appendChild(vm.el);
    }

    if (target) {
        open(target);
    }

    return {
        vm,
        close,
        open,
        setTip: (tip) => {
            data.tip = tip || '';
        },
        setLoading: (loading) => {
            data.loading = loading;
        },

        get loading() {
            return data.loading;
        },
        get $el() {
            return vm?.el;
        },
    };
}

