class Drag {
    static zIndex = 1;
    constructor(el, option = {}) {
        el.style["cursor"] = "move";
        this.el0 = el;
        this.el = el.parentNode;
        this.x = 0;
        this.y = 0;
        this.option = option;
        this.init();
    }
    init() {
        this.setEleStyle(this.option || {});
        this.el0.onmousedown = (e) => {
            this.onMouseDown(e);
            this.el0.setCapture && this.el0.setCapture(); //全局捕获
            return false;
        };
    }
    //样式设置
    setEleStyle(option) {
        for (const key in option) {
            this.el.style[key] = option[key];
        }
    }

    getStyle(dom, attr) {
        return getComputedStyle(dom)[attr];
    }

    //按下ele
    onMouseDown(e) {
        const dragDom = this.el;
        if (!e) return;
        // 鼠标按下，计算当前元素距离可视区的距离
        const disX = e.clientX;
        const disY = e.clientY;
        const screenWidth = document.body.clientWidth; // body当前宽度
        const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

        const dragDomWidth = dragDom.offsetWidth; // 对话框宽度
        const dragDomheight = dragDom.offsetHeight; // 对话框高度

        const minDragDomLeft = dragDom.offsetLeft;

        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
        const minDragDomTop = dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;
        // 获取到的值带px 正则匹配替换
        const domLeft = this.getStyle(dragDom, "left");
        const domTop = this.getStyle(dragDom, "top");
        let styL = +domLeft;
        let styT = +domTop;

        // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
        if (domLeft.includes("%")) {
            styL =
                +document.body.clientWidth * (+domLeft.replace(/%/g, "") / 100);
            styT =
                +document.body.clientHeight * (+domTop.replace(/%/g, "") / 100);
        } else {
            styL = +domLeft.replace(/px/g, "");
            styT = +domTop.replace(/px/g, "");
        }

        document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            // 边界处理
            if (-left > minDragDomLeft) {
                left = -minDragDomLeft;
            } else if (left > maxDragDomLeft) {
                left = maxDragDomLeft;
            }

            if (-top > minDragDomTop) {
                top = -minDragDomTop;
            } else if (top > maxDragDomTop) {
                top = maxDragDomTop;
            }

            // 移动当前元素
            dragDom.style.cssText += `;left:${left + styL}px;top:${
                top + styT
            }px;`;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}

export default Drag;
