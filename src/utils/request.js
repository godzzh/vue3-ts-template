import { extend } from "umi-request";
import router from "@/router";

const codeMessage = {
    200: "服务器成功返回请求的数据。",
    201: "新建或修改数据成功。",
    202: "一个请求已经进入后台排队（异步任务）。",
    204: "删除数据成功。",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
    401: "用户没有权限（令牌、用户名、密码错误）。",
    403: "用户得到授权，但是访问是被禁止的。",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
    406: "请求的格式不可得。",
    410: "请求的资源被永久删除，且不会再得到的。",
    422: "当创建一个对象时，发生一个验证错误。",
    500: "服务器发生错误，请检查服务器。",
    502: "网关错误。",
    503: "服务不可用，服务器暂时过载或维护。",
    504: "网关超时。",
};

//错误处理
const errorHandler = (error) => {
    const { response } = error;
    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        window.$notification.error({
            content: `请求错误 ${status}: ${url}`,
            meta: errorText,
            duration: 2500,
        });
    } else if (!response) {
        window.$notification.error({
            content: "网络异常",
            meta: "请检查您的网络",
            duration: 2500,
        });
    }
    return response;
};

const request = extend({
    prefix: "", //url前缀
    timeout: 1000 * 60, //超时时间
    useCache: true, // 是否使用缓存
    ttl: 5000, //缓存时间
    errorHandler, //错误统一处理
});

//请求拦截器
request.interceptors.request.use((url, options) => {
    const token = localStorage.getItem("Token");
    if (token) {
        options.headers["Authorization"] = `Basic ${token}`;
    }
    return {
        url,
        options,
    };
});

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

//响应拦截器
request.interceptors.response.use(async (response) => {
    await delay(200);
    //文件流，直接返回
    if (request.responseType == "blob") {
        return response;
    }
    let data = await response.json();
    if (data.code === 5000 || data.code === 401) {
        window.$notification.error({
            content: "登录已过期",
            meta: "请返回重新登录了再进行操作",
            duration: 2500,
        });
        // 重置store里的用户信息;
        // const userStore = useUserStore();
        // userStore.Logout();
        // 重定向到登录页
        router
            .replace({
                path: "/login",
                query: {
                    redirect: encodeURIComponent(window.location.href),
                },
            })
            .catch((err) => {});
    } else if (
        data.code !== 0 &&
        data.code !== 200 &&
        data.code !== 5000 &&
        data.code !== 401 &&
        data.code !== 33
    ) {
        window.$message.warning(data.message || data.msg);
    }
    return data;
});

export default request;
