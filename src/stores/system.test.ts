import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useSystemStore from './system';

describe('system store', () => {
    beforeEach(() => {
        localStorage.clear();
        setActivePinia(createPinia());
    });

    it('uses safe defaults', () => {
        const store = useSystemStore();
        expect(store.sysTheme).toBe(false);
        expect(store.language).toBe('zh-CN');
    });

    it('persists theme and language changes', () => {
        const store = useSystemStore();
        store.toggleTheme();
        store.toggleLanguage('en-US');

        expect(store.sysTheme).toBe(true);
        expect(store.language).toBe('en-US');
        expect(localStorage.getItem('darkTheme')).toBe('yes');
        expect(localStorage.getItem('language')).toBe('en-US');
    });

    it('normalizes historical language values', () => {
        localStorage.setItem('language', 'EN');
        const store = useSystemStore();
        expect(store.language).toBe('en-US');
    });
});
