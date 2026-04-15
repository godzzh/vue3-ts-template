interface DragOption {
    [key: string]: string | number;
}

class Drag {
    static zIndex = 1;
    private el0: HTMLElement;
    private el: HTMLElement;
    private x = 0;
    private y = 0;
    private option: DragOption;

    constructor(el: HTMLElement, option: DragOption = {}) {
        el.style.cursor = "move";
        this.el0 = el;
        this.el = el.parentNode as HTMLElement;
        this.option = option;
        this.init();
    }

    private init(): void {
        this.setEleStyle(this.option);
        this.el0.onmousedown = (e: MouseEvent) => {
            this.onMouseDown(e);
            if ((this.el0 as any).setCapture) {
                (this.el0 as any).setCapture();
            }
            return false;
        };
    }

    private setEleStyle(option: DragOption): void {
        for (const key in option) {
            this.el.style[key as any] = option[key] as any;
        }
    }

    private getStyle(dom: HTMLElement, attr: string): string {
        return getComputedStyle(dom)[attr as any] as string;
    }

    private onMouseDown(e: MouseEvent): void {
        const dragDom = this.el;
        if (!e) return;

        const disX = e.clientX;
        const disY = e.clientY;
        const screenWidth = document.body.clientWidth;
        const screenHeight = document.documentElement.clientHeight;

        const dragDomWidth = dragDom.offsetWidth;
        const dragDomheight = dragDom.offsetHeight;

        const minDragDomLeft = dragDom.offsetLeft;
        const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth;
        const minDragDomTop = dragDom.offsetTop;
        const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight;

        const domLeft = this.getStyle(dragDom, "left");
        const domTop = this.getStyle(dragDom, "top");
        let styL = +domLeft;
        let styT = +domTop;

        if (domLeft.includes("%")) {
            styL = +document.body.clientWidth * (+domLeft.replace(/%/g, "") / 100);
            styT = +document.body.clientHeight * (+domTop.replace(/%/g, "") / 100);
        } else {
            styL = +domLeft.replace(/px/g, "");
            styT = +domTop.replace(/px/g, "");
        }

        document.onmousemove = (ev: MouseEvent) => {
            let left = ev.clientX - disX;
            let top = ev.clientY - disY;

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

            dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
}

export default Drag;
