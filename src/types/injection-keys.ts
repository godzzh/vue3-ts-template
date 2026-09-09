import type { InjectionKey } from 'vue';
import type { Emitter } from 'mitt';
import type dayjs from 'dayjs';
import type * as utilsModule from '@/utils/utils';

export type ApiMethod = (...args: unknown[]) => Promise<unknown>;
export type ApiService = Record<string, ApiMethod>;

export interface GlobalInjection {
    $api: ApiService;
    $utils: typeof utilsModule;
    $dayjs: typeof dayjs;
    $emitter: Emitter<Record<string, unknown>>;
}

/** 全局注入的类型化 Key：provide/inject 双端共用，替代裸字符串 + any */
export const GlobalKey: InjectionKey<GlobalInjection> = Symbol('global');
