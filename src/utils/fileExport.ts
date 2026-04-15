import request from "umi-request";

interface FileExportOptions {
    url: string;
    data?: Record<string, unknown>;
    title?: string;
    method?: "GET" | "POST";
    isParams?: boolean;
}

interface ExportResult {
    code: number;
}

const fileExport = ({
    url,
    data,
    title,
    method = "POST",
    isParams,
}: FileExportOptions): Promise<ExportResult> => {
    return new Promise((resolve) => {
        request(url, {
            method,
            responseType: "blob",
            data,
            params: isParams ? data : undefined,
        })
            .then((res) => {
                resolve({ code: 200 });
                const blob = new Blob([res as BlobPart]);
                const blobUrl = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobUrl;
                a.download = `${title || "下载文件.xls"}`;
                a.style.display = "none";
                a.click();
                URL.revokeObjectURL(blobUrl);
            })
            .catch(() => {
                resolve({ code: 202 });
            });
    });
};

export default fileExport;
