import request from "umi-request";

//文件导出
const fileExport = (url, data, title, method = "POST", isParams) => {
    return new Promise((resolve, reject) => {
        request(url, {
            method,
            responseType: "blob",
            data,
            params: isParams ? data : undefined,
        })
            .then((res) => {
                resolve({ code: 200 });
                const blob = new Blob([res]);
                let url = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = url; // 给a标签赋上下载地址
                a.download = `${title || "下载文件.xls"}`;
                a.style.display = "none"; // 让a标签不显示
                a.click(); // a标签自点击
                URL.revokeObjectURL(a.href);
            })
            .catch((err) => {
                resolve({ code: 202 });
            });
    });
};

export default fileExport;
