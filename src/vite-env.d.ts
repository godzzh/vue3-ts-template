/// <reference types="vite/client" />

import type { DialogApi, LoadingBarApi, MessageApi, NotificationApi } from 'naive-ui';

interface ImportMetaEnv {
    readonly VITE_APP_TITLE?: string;
    readonly VITE_API_BASE_URL?: string;
    readonly VITE_PROXY_TARGET?: string;
    readonly VITE_PORT?: string;
    readonly VITE_BUILD_SOURCEMAP?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare global {
    interface Window {
        $message?: MessageApi;
        $dialog?: DialogApi;
        $notification?: NotificationApi;
        $loadingBar?: LoadingBarApi;
        ___CONFIG?: Record<string, unknown>;
    }
}

export {};
