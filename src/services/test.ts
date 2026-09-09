import request from '@/utils/request';

export interface ListQuery {
    page: number;
    pageSize: number;
    keyword?: string;
}

export interface ListItem {
    id: string;
    name: string;
    updatedAt: string;
}

export interface PageResult<T> {
    list: T[];
    total: number;
}

/** 示例接口：新项目请按业务领域重命名文件和方法。 */
export const getExampleList = (params: ListQuery) =>
    request<PageResult<ListItem>>('/examples', {
        method: 'GET',
        params,
    });
