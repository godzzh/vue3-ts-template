// 去除谷歌浏览器的scroll、wheel等事件警告
(function () {
    if (typeof EventTarget !== "undefined") {
        const func = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = function (
            type: string,
            fn: EventListener,
            capture: boolean | AddEventListenerOptions
        ) {
            (this as any).func = func;
            if (typeof capture !== "boolean") {
                capture = capture || {};
                (capture as AddEventListenerOptions).passive = false;
            }
            (this as any).func(type, fn, capture);
        };
    }
})();
