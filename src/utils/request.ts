import { extend, RequestOptionsInit } from "umi-request";
import router from "@/router";

const codeMessage: Record<number, string> = {
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

const errorHandler = (error: { response?: Response }): Response | undefined => {
    const { response } = error;
    if (response && response.status) {
        const errorText =
            codeMessage[response.status] || response.statusText;
        const { status, url } = response;
        window.$notification?.error({
            content: `请求错误 ${status}: ${url}`,
            meta: errorText,
            duration: 2500,
        });
    } else if (!response) {
        window.$notification?.error({
            content: "网络异常",
            meta: "请检查您的网络",
            duration: 2500,
        });
    }
    return response;
};

const request = extend({
    prefix: "",
    timeout: 1000 * 60,
    useCache: true,
    ttl: 5000,
    errorHandler,
});

request.interceptors.request.use(
    (url: string, options: RequestOptionsInit) => {
        const token = localStorage.getItem("Token");
        if (token) {
            const headers = (options.headers as Record<string, string>) || {};
            headers["Authorization"] = `Basic ${token}`;
            options.headers = headers;
        }
        return {
            url,
            options,
        };
    }
);

const delay = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

interface ResponseData {
    code?: number;
    message?: string;
    msg?: string;
    [key: string]: unknown;
}

// Use type assertion for response interceptor to avoid umi-request type issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseInterceptor = async (response: any) => {
    await delay(200);

    if ((request as any).responseType === "blob") {
        return response;
    }

    const data: ResponseData = await response.json();

    if (data.code === 5000 || data.code === 401) {
        window.$notification?.error({
            content: "登录已过期",
            meta: "请返回重新登录了再进行操作",
            duration: 2500,
        });
        router
            .replace({
                path: "/login",
                query: {
                    redirect: encodeURIComponent(window.location.href),
                },
            })
            .catch(() => { });
    } else if (
        data.code !== 0 &&
        data.code !== 200 &&
        data.code !== 5000 &&
        data.code !== 401 &&
        data.code !== 33
    ) {
        window.$message?.warning(data?.message || data?.msg || '未知错误');
    }
    return data;
};

request.interceptors.response.use(responseInterceptor as any);

export default request;
