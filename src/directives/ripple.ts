/**
 * v-ripple 点击涟漪指令
 * - v-ripple 或 v-ripple="{ color: '#2563EB', duration: 400 }"
 * - 使用 Web Animations API（transform/opacity 可离线合成），避免 setInterval 逐帧改布局
 */

interface RippleOptions {
    color?: string;
    /** 动画时长（ms），默认 400 */
    duration?: number;
}

/** 计算两点间距离 */
function getDistance(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/** 计算点击点到元素四角的最大距离（即最大半径） */
function getMaxRadius(x: number, y: number, width: number, height: number): number {
    return Math.max(
        getDistance(x, y, 0, 0),
        getDistance(x, y, width, 0),
        getDistance(x, y, 0, height),
        getDistance(x, y, width, height)
    );
}

const rippleDirective = {
    mounted(el: HTMLElement & { _ripple?: (event: PointerEvent) => void }, binding: any) {
        const handler = (event: PointerEvent) => {
            const options: RippleOptions = binding.value || {};
            const duration = Number(options.duration) || 400;

            // 设置外层元素相对定位且裁剪溢出部分
            const _position = el.style.position;
            if (_position !== 'fixed' && _position !== 'sticky') {
                el.style.position = 'relative';
            }
            el.style.overflow = 'hidden';

            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const diameter = getMaxRadius(x, y, rect.width, rect.height) * 2;

            const span = document.createElement('span');
            span.style.position = 'absolute';
            span.style.pointerEvents = 'none';
            span.style.background = options.color || 'var(--primary-color)';
            span.style.borderRadius = '50%';
            span.style.width = `${diameter}px`;
            span.style.height = `${diameter}px`;
            span.style.left = `${x - diameter / 2}px`;
            span.style.top = `${y - diameter / 2}px`;
            span.style.transform = 'scale(0)';
            el.appendChild(span);

            const animation = span.animate(
                [
                    { transform: 'scale(0)', opacity: 0.45 },
                    { transform: 'scale(1)', opacity: 0 },
                ],
                { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
            );
            const remove = () => span.remove();
            animation.onfinish = remove;
            animation.oncancel = remove;
        };

        el.addEventListener('pointerdown', handler);
        el._ripple = handler;
    },

    unmounted(el: HTMLElement & { _ripple?: (event: PointerEvent) => void }) {
        if (el._ripple) {
            el.removeEventListener('pointerdown', el._ripple);
            delete el._ripple;
        }
    },
};

export function setupRippleDirective(app: any) {
    app.directive('ripple', rippleDirective);
}

export default rippleDirective;
