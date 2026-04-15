import router from "@/router";

interface TreeItem {
    id: string | number;
    pid?: string | number;
    children?: TreeItem[];
    [key: string]: unknown;
}

interface FlattenItem {
    [key: string]: unknown;
}

// 数组转树结构
export const toTree = (
    data: TreeItem[],
    str1: string = "id",
    str2: string = "pid"
): TreeItem[] => {
    const result: TreeItem[] = [];
    if (!Array.isArray(data)) {
        return result;
    }
    data.forEach((item) => {
        delete item.children;
    });
    const map: Record<string, TreeItem> = {};
    data.forEach((item) => {
        map[item[str1] as string] = item;
    });
    data.forEach((item) => {
        const parent = map[item[str2] as string];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

// 拍平多维数组
export const flattenArray = (arr: FlattenItem[], str: string): FlattenItem[] => {
    const list: FlattenItem[] = [];
    arr.map((item) => {
        list.push(item);
        if (item[str]) {
            const _list = flattenArray(item[str] as FlattenItem[], str);
            list.push(..._list);
        }
    });
    list.map((_item) => delete _item[str]);
    return list;
};

// 判断数组对象的某个属性是否等于指定值
export const keyEqualStr = (
    arr: FlattenItem[],
    key: string,
    str: string,
    result: boolean = false
): boolean => {
    arr.forEach((item) => {
        if (item[key] === str) {
            result = true;
            return;
        }
        if (item.children && (item.children as FlattenItem[]).length) {
            result = keyEqualStr(
                item.children as FlattenItem[],
                key,
                str,
                result
            );
        }
    });
    return result;
};

export const findParten = (
    arr: FlattenItem[],
    key: string,
    str: string
): FlattenItem | undefined => {
    let _obj: FlattenItem | undefined;
    arr.map((v) => {
        const res =
            v.children && (v.children as FlattenItem[]).some((i) => i[key] === str);
        if (res) _obj = v;
    });
    return _obj;
};

// 获取url参数
export function getUrlParam(key: string): string {
    const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ""));
    const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, "i");
    const paramMatch = url.match(regexp);
    return paramMatch ? paramMatch[2] : "";
}

// 手机号校验
export const phone_patter = /^[1-9][0-9]{10}$/;

// 信用代码强校验
export const xydm_patter =
    /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;

// 身份证号强校验
const checkProv = (val: string): boolean => {
    const pattern = /^[1-9][0-9]/;
    const provs: Record<string, string> = {
        "11": "北京",
        "12": "天津",
        "13": "河北",
        "14": "山西",
        "15": "内蒙古",
        "21": "辽宁",
        "22": "吉林",
        "23": "黑龙江 ",
        "31": "上海",
        "32": "江苏",
        "33": "浙江",
        "34": "安徽",
        "35": "福建",
        "36": "江西",
        "37": "山东",
        "41": "河南",
        "42": "湖北 ",
        "43": "湖南",
        "44": "广东",
        "45": "广西",
        "46": "海南",
        "50": "重庆",
        "51": "四川",
        "52": "贵州",
        "53": "云南",
        "54": "西藏 ",
        "61": "陕西",
        "62": "甘肃",
        "63": "青海",
        "64": "宁夏",
        "65": "新疆",
        "71": "台湾",
        "81": "香港",
        "82": "澳门",
    };
    return pattern.test(val) && !!provs[val];
};

// 出生日期码校验
const checkDate = (val: string): boolean => {
    const pattern =
        /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        const year = val.substring(0, 4);
        const month = val.substring(4, 6);
        const date = val.substring(6, 8);
        const date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() === parseInt(month) - 1) {
            return true;
        }
    }
    return false;
};

// 校验码校验
const checkCode = (val: string): boolean => {
    const p =
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    const code = val.substring(17);
    if (p.test(val)) {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += parseInt(val[i]) * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
};

// 身份证号强校验
export const idcard_patter = (val: string): boolean => {
    return (
        checkCode(val) &&
        checkDate(val.substring(6, 14)) &&
        checkProv(val.substring(0, 2))
    );
};

// 判断十六进制颜色是深色还是浅色
export const getColorType = (hex: string = "#666666"): boolean => {
    if (!hex) hex = "#666666";
    const rgb =
        "rgb(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        ")";
    const rgbVal = rgb.replace("rgb(", "").replace(")", "");
    const rgbList = rgbVal.split(",");
    const level =
        parseFloat(rgbList[0]) * 0.299 +
        parseFloat(rgbList[1]) * 0.587 +
        parseFloat(rgbList[2]) * 0.114;
    return level >= 192;
};

// 获取标签颜色、背景色
export const getColorStyle = (hex: string = "#666666"): string => {
    if (!hex) hex = "#666666";
    const isWhite = getColorType(hex);
    const bgColor = isWhite
        ? hex
        : "rgba(" +
          parseInt("0x" + hex.slice(1, 3)) +
          "," +
          parseInt("0x" + hex.slice(3, 5)) +
          "," +
          parseInt("0x" + hex.slice(5, 7)) +
          ", 0.1)";
    const textColor = isWhite ? "#555555" : hex;
    return `background: ${bgColor}; color: ${textColor};--bg-color: ${hex};`;
};

// 复制文本到剪切板
export const copyText = (text: string): void => {
    const el = document.createElement("span");
    el.style.position = "absolute";
    el.innerHTML = text;
    document.body.appendChild(el);
    const createRange = document.createRange();
    createRange.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(createRange);
    document.execCommand("Copy");
    document.body.removeChild(el);
    selection?.removeAllRanges();
    window.$message?.success("已复制到剪切板", {
        duration: 1000,
    });
};

// 新窗口打开页面
export const openNewTab = (fullPath: string, params?: Record<string, string>): void => {
    const routeData = router.resolve({
        path: fullPath,
        query: params,
    });
    const a = document.createElement("a");
    a.href = routeData.href;
    a.target = "_blank";
    a.style.display = "none";
    a.click();
};

// 格式化金额数字
export const formatCurrency = (val: number | string): string => {
    if (!val) return "0";
    const _val = parseFloat(val as string);
    return _val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
