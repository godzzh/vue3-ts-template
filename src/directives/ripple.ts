/**
 * 计算当前点到达角的距离
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * */
function getDistance(x1, y1, x2, y2) {
    const deltaX = x1 - x2;
    const deltaY = y1 - y2;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/**
 * 计算当前最大的半径
 * @param {Number} x 点击处到外层元素左上角的横向距离
 * @param {Number} y 点击处到外层元素左上角的纵向距离
 * @param {Number} width 外层元素的宽度
 * @param {Number} height 外层元素的高度
 * */
function getMaxRadius(x: number, y: number, width: number, height: number) {
    let topLeft = getDistance(x, y, 0, 0);
    let topRight = getDistance(x, y, width, 0);
    let bottomLeft = getDistance(x, y, 0, height);
    let bottomRight = getDistance(x, y, width, height);
    let radius = Math.max(topLeft, topRight, bottomLeft, bottomRight);
    return radius;
}

const rippleDirective = {
    mounted: (el: HTMLElement, binding: any) => {
        el.addEventListener("pointerdown", (event) => {
            // 设置外层元素相对定位且隐藏多余部分
            let _position = el.style.position;
            if (_position !== "fixed" && _position !== "sticky") {
                el.style.position = "relative";
            }
            el.style.overflow = "hidden";

            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const rectHeight = rect.height;
            const rectWidth = rect.width;

            console.log(rectWidth, rectHeight);

            //在鼠标位置增加一个span标签，将此标签插入当前元素内部
            let span = document.createElement("span");
            span.style.position = "absolute";
            span.style.background =
                binding.value?.color || "var(--primary-color)";
            span.style.borderRadius = "50%";
            el.append(span);

            // 初始化元素的宽、高、透明度
            let width = 0;
            let height = 0;
            let opacity = 0.6;
            let diameter = getMaxRadius(x, y, rectWidth, rectHeight) * 1;
            console.log(diameter);

            // 通过定时器不断增大宽高，减小透明度
            let time = setInterval(() => {
                width += 10;
                height += 10;
                opacity -= 0.02;
                //判断超出最大值时，清除定时，并且删除span
                if (width < diameter) {
                    span.style.width = width * 2 + "px";
                    span.style.height = height * 2 + "px";
                    span.style.opacity = String(opacity > 0.25 ? opacity : 0.25);
                    span.style.left = x - span.offsetWidth / 2 + "px";
                    span.style.top = y - span.offsetHeight / 2 + "px";
                } else {
                    clearInterval(time);
                    time = null;
                    span.remove();
                }
            }, binding.value?.duration / 100 || 12);
        });
    },
};

export function setupRippleDirective(app) {
    app.directive("ripple", rippleDirective);
}

export default rippleDirective;
