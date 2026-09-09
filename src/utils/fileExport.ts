import request from '@/utils/request';

interface FileExportOptions {
    url: string;
    data?: Record<string, unknown>;
    title?: string;
    method?: 'GET' | 'POST';
    /** true 时参数挂到 URL query，否则放请求体 */
    isParams?: boolean;
}

interface ExportResult {
    code: number;
}

/**
 * 文件导出：走统一封装的 request 实例（自动携带 Authorization / 统一错误提示）。
 * 服务端出错时常返回 JSON —— 先识别，避免把错误信息存成 .xls 文件。
 */
const fileExport = ({
    url,
    data,
    title,
    method = 'POST',
    isParams,
}: FileExportOptions): Promise<ExportResult> => {
    return request(url, {
        method,
        responseType: 'blob',
        data,
        params: isParams ? data : undefined,
    })
        .then(async (res) => {
            const blob = res as unknown as Blob;
            if (blob?.type?.includes('application/json')) {
                let msg = '导出失败';
                try {
                    const parsed = JSON.parse(await blob.text()) as {
                        message?: string;
                        msg?: string;
                    };
                    msg = parsed?.message || parsed?.msg || msg;
                } catch {
                    /* 非 JSON 内容按默认文案处理 */
                }
                window.$message?.error(msg);
                return { code: 500 };
            }
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = title || '下载文件.xls';
            a.style.display = 'none';
            a.click();
            URL.revokeObjectURL(blobUrl);
            return { code: 200 };
        })
        .catch(() => {
            window.$message?.error('导出失败，请重试');
            return { code: 202 };
        });
};

export default fileExport;
