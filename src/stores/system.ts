import { ref } from 'vue';
import { defineStore } from 'pinia';

export type AppLanguage = 'zh-CN' | 'en-US';

/** 兼容历史存储值（'CN' / 'EN'），统一收敛为 i18n 语言码 */
const normalizeLanguage = (value: string | null): AppLanguage => {
    if (value === 'en-US' || value === 'EN') return 'en-US';
    return 'zh-CN';
};

const useSystemStore = defineStore('system', () => {
    // 主题状态从持久化存储初始化，保证刷新后 store 与 DOM 一致
    const sysTheme = ref(localStorage.getItem('darkTheme') === 'yes');

    const storedLang = localStorage.getItem('language');
    if (storedLang === null) {
        localStorage.setItem('language', 'zh-CN');
    }
    const language = ref<AppLanguage>(normalizeLanguage(storedLang));

    const toggleLanguage = (lang?: AppLanguage) => {
        language.value = lang ?? (language.value === 'zh-CN' ? 'en-US' : 'zh-CN');
        localStorage.setItem('language', language.value);
    };

    const sidebarCollapsed = ref(localStorage.getItem('sidebarCollapsed') === 'yes');

    const toggleSidebar = (collapsed?: boolean) => {
        sidebarCollapsed.value = collapsed ?? !sidebarCollapsed.value;
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed.value ? 'yes' : 'no');
    };

    const sysInfo = ref({
        title: import.meta.env.VITE_APP_TITLE || 'Vue Forge',
        logo: '/favicon.svg',
    });

    const toggleTheme = () => {
        sysTheme.value = !sysTheme.value;
        localStorage.setItem('darkTheme', sysTheme.value ? 'yes' : 'no');
    };

    return {
        sysTheme,
        toggleTheme,
        language,
        sysInfo,
        toggleLanguage,
        sidebarCollapsed,
        toggleSidebar,
    };
});

export default useSystemStore;
