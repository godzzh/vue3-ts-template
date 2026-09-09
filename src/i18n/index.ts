import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

const messages = {
    'zh-CN': zhCN,
    'en-US': enUS,
};

/** 与 stores/system 保持同一来源：从 localStorage 初始化，兼容历史 'CN'/'EN' 值 */
const initialLocale =
    localStorage.getItem('language') === 'en-US' || localStorage.getItem('language') === 'EN'
        ? 'en-US'
        : 'zh-CN';

const i18n = createI18n({
    legacy: false,
    locale: initialLocale,
    fallbackLocale: 'en-US',
    messages,
});

export default i18n;
