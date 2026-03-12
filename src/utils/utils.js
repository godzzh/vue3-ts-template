import router from "@/router";

//数组转树结构
export const toTree = (data, str1 = "id", str2 = "pid") => {
    let result = [];
    if (!Array.isArray(data)) {
        return result;
    }
    data.forEach((item) => {
        delete item.children;
    });
    let map = {};
    data.forEach((item) => {
        map[item[str1]] = item;
    });
    data.forEach((item) => {
        let parent = map[item[str2]];
        if (parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
    return result;
};

//拍平多维数组
export const flattenArray = (arr, str) => {
    var list = [];
    arr.map((item) => {
        list.push(item);
        if (item[str]) {
            let _list = flattenArray(item[str], str);
            list.push(..._list);
        }
    });
    list.map((_item) => delete _item[str]);
    return list;
};

//判断数组对象的某个属性是否等于指定值
export const keyEqualStr = (arr, key, str, reslut = false) => {
    arr.forEach((item) => {
        if (item[key] === str) {
            reslut = true;
            return;
        }
        if (item.children && item.children.length) {
            reslut = keyEqualStr(item.children, key, str, reslut);
        }
    });
    return reslut;
};

export const findParten = (arr, key, str) => {
    let _obj;
    arr.map((v) => {
        let res = v.children && v.children.some((i) => i[key] === str);
        if (res) _obj = v;
    });
    return _obj;
};

//获取url参数
export function getUrlParam(key) {
    const url = decodeURI(window.location.href.replace(/^[^?]*\?/, ""));
    const regexp = new RegExp(`(^|&)${key}=([^&#]*)(&|$|)`, "i");
    const paramMatch = url.match(regexp);
    return paramMatch ? paramMatch[2] : "";
}

//手机号校验
export const phone_patter = /^[1-9][0-9]{10}$/;

//信用代码强校验
export const xydm_patter =
    /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;

//身份证号强校验
const checkProv = (val) => {
    const pattern = /^[1-9][0-9]/;
    const provs = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
    };
    return pattern.test(val) && provs[val];
};
// 出生日期码校验
const checkDate = (val) => {
    const pattern =
        /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        const year = val.substring(0, 4);
        const month = val.substring(4, 6);
        const date = val.substring(6, 8);
        const date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == parseInt(month) - 1) {
            return true;
        }
    }
    return false;
};
// 校验码校验
// 加权因子表 【表1】:
//      i	1	2	3	4	5	6	7	8   9	10	11	12	13	14	15	16	17
//      Wi	7	9	10	5	8	4	2	1   6	3	7	9	10	5	8	4	2
// X与校验码换算表 【表2】:
//      X	0	1	2	3	4	5	6	7	8	9	10
//      a18	1	0	X	9	8	7	6	5	4	3   2
// 算法过程：
// 根据身份证主体码（前17位）分别与对应的加权因子（表1）计算乘积再求和，根据所得结果与11取模得到X值。
// 根据 X 值查询表2，得出a18即校验码值。
const checkCode = (val) => {
    const p =
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    const code = val.substring(17);
    if (p.test(val)) {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
};

//身份证号强校验
export const idcard_patter = (val) => {
    return (
        checkCode(val) &&
        checkDate(val.substring(6, 14)) &&
        checkProv(val.substring(0, 2))
    );
};

//判断十六进制颜色是深色还是浅色
export const getColorType = (hex = "#666666") => {
    if (!hex) hex = "#666666";
    let rgb =
        "rgb(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        ")";
    let rgbVal = rgb.replace("rgb(", "").replace(")", "");
    let rgbList = rgbVal.split(",");
    let level = rgbList[0] * 0.299 + rgbList[1] * 0.587 + rgbList[2] * 0.114;
    if (level >= 192) {
        //浅色
        return true;
    } else {
        //深色
        return false;
    }
};

//获取标签颜色、背景色
export const getColorStyle = (hex = "#666666") => {
    if (!hex) hex = "#666666";
    let isWhite = getColorType(hex);
    let bgColor = isWhite
        ? hex
        : "rgba(" +
          parseInt("0x" + hex.slice(1, 3)) +
          "," +
          parseInt("0x" + hex.slice(3, 5)) +
          "," +
          parseInt("0x" + hex.slice(5, 7)) +
          ", 0.1)";
    let textColor = isWhite ? "#555555" : hex;
    return `background: ${bgColor}; color: ${textColor};--bg-color: ${hex};`;
};

//复制文本到剪切板
export const copyText = (text) => {
    const el = document.createElement("span");
    el.style.position = "absolute";
    el.innerHTML = text;
    document.body.appendChild(el);
    let createRange = document.createRange();
    createRange.selectNodeContents(el);
    const selection = document.getSelection();
    selection.removeAllRanges();
    selection.addRange(createRange);
    document.execCommand("Copy");
    document.body.removeChild(el);
    selection.removeAllRanges();
    window.$message.success("已复制到剪切板", {
        duration: 1000,
    });
};

//新窗口打开页面
export const openNewTab = (fullPath, params) => {
    let routeData = router.resolve({
        path: fullPath,
        query: params,
    });
    var a = document.createElement("a");
    a.href = routeData.href;
    a.target = "_blank";
    a.style.display = "none"; // 让a标签不显示
    a.click(); // a标签自点击
};

//格式化金额数字
export const formatCurrency = (val) => {
    if (!val) return 0;
    let _val = parseFloat(val);
    return _val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
