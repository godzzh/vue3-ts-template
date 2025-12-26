const primaryColor = "rgba(50, 105, 255, 1)"; //主题色
const primaryColor1 = "rgba(50, 105, 255, 0.3)";
const errorColor = "#f5222d";
const successColor = "#08b871";
const itemActiveColor = "rgba(50, 105, 255, 0.1)";
const warningColor = "#faad14";
const borderRadius = "2px";

const baseCommon = {
    primaryColor: primaryColor,
    primaryColorHover: primaryColor,
    primaryColorPressed: primaryColor,
    primaryColorSuppl: primaryColor,
    borderRadius,
    heightSmall: "26px",
    heightMedium: "32px",
};

//明亮主题
export const lightThemeColor = {
    common: {
        ...baseCommon,
    },
};

//暗黑主题
export const darkThemeColor = {
    common: {
        ...baseCommon,
    },
    Button: {
        textColorPrimary: "#fff",
        textColorHoverPrimary: "#fff",
        textColorPressedPrimary: "#fff",
        textColorFocusPrimary: "#fff",
    },
    Checkbox: {
        checkMarkColor: "#fff",
    },
};

//主题色、辅助色、文字颜色、辅助文字颜色、标题颜色、边框颜色、警告颜色、错误颜色、圆角大小、获焦颜色、成功颜色、阴影颜色

//其它的一些公用样式
const otherStyle = {
    "--primary-color": primaryColor, //主题色
    "--primary-color-1": primaryColor1, //辅助色
    "--border-radius": borderRadius,
    "--success-color": successColor,
    "--warning-color": warningColor,
    "--error-color": errorColor, //错误颜色
    "--primary-color-rgb": "50, 105, 255", //主题色
};

//暗黑主题变量
export const darkStyle = {
    "--item-active-color": "rgba(50, 105, 255, 0.15)",
    "--bg-color-1": "rgb(24, 24, 28)", //背景色1
    "--bg-color-2": "rgba(224, 224, 230, .05)", //背景色1
    "--bg-color-3": "#222",
    "--bg-color-4": "rgb(40, 40, 50)",
    "--bg-color-5": "rgb(24, 24, 28, 0.7)",
    "--border-color": "rgba(224, 224, 230, .2)", //边框颜色
    "--border-color-2": "rgba(224, 224, 230, .3)", //边框颜色
    "--border-color-3": "#444", //边框颜色
    "--modal-title-bg-color": "#444",
    "--text-color-base": "rgba(255, 255, 255, 85%)", //文字颜色
    "--text-color-base-2": "rgba(255, 255, 255, 65%)", //非主要文字颜色
    "--box-shadow-color": "rgba(24, 24, 28, 15%)",
    "--placeholder-color": "rgba(255, 255, 255, 0.55)",
    "--loading-bg-color": "rgba(24, 24, 28, 0.38)", //loading组件背景色
    "--image-error-bg-color": "rgba(255, 255, 255, 0.05)",
    "--page-bg-color": "#111",
    ...otherStyle,
};

//明亮主题变量
export const lightStyle = {
    "--item-active-color": "rgba(50, 105, 255, 0.1)",
    "--bg-color-1": "#fff", //背景色1
    "--bg-color-2": "rgba(0, 0, 0, .05)", //背景色1
    "--bg-color-3": "#fff",
    "--bg-color-4": "#fff",
    "--bg-color-5": "rgb(255, 255, 255, 0.7)",
    "--border-color": "rgba(224, 224, 230, .8)", //边框颜色
    "--border-color-2": "rgba(224, 224, 230, .7)", //边框颜色
    "--border-color-3": "#e8e8e8", //边框颜色
    "--modal-title-bg-color": "rgba(224, 224, 230, 1)",
    "--text-color-base": "rgba(0, 0, 0, 85%)",
    "--text-color-base-2": "rgba(0, 0, 0, 65%)",
    "--box-shadow-color": "rgba(0, 0, 0, 15%)",
    "--placeholder-color": "rgba(194, 194, 194, 1)",
    "--loading-bg-color": "rgba(24, 24, 28, 0.38)",
    "--image-error-bg-color": "rgba(0, 0, 0, 0.03)",
    "--page-bg-color": "rgba(0, 0, 0, 0.03)",
    ...otherStyle,
};
