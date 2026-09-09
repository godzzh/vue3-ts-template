import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import useAuthStore, { AUTH_TOKEN_KEY, DEMO_TOKEN } from './auth';

describe('auth store', () => {
    beforeEach(() => {
        localStorage.clear();
        setActivePinia(createPinia());
    });

    it('starts unauthenticated without a token', () => {
        const store = useAuthStore();
        expect(store.isAuthenticated).toBe(false);
        expect(store.token).toBe('');
    });

    it('persists the demo token after login', () => {
        const store = useAuthStore();
        store.login();
        expect(store.isAuthenticated).toBe(true);
        expect(store.token).toBe(DEMO_TOKEN);
        expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBe(DEMO_TOKEN);
    });

    it('clears authentication on logout', () => {
        localStorage.setItem(AUTH_TOKEN_KEY, 'existing-token');
        const store = useAuthStore();
        store.logout();
        expect(store.isAuthenticated).toBe(false);
        expect(localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull();
    });
});
