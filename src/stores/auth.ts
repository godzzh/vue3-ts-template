import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const AUTH_TOKEN_KEY = 'Token';
export const DEMO_TOKEN = 'vue-forge-demo-token';

const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem(AUTH_TOKEN_KEY) ?? '');
    const isAuthenticated = computed(() => token.value.length > 0);

    const login = (nextToken = DEMO_TOKEN) => {
        token.value = nextToken;
        localStorage.setItem(AUTH_TOKEN_KEY, nextToken);
    };

    const logout = () => {
        token.value = '';
        localStorage.removeItem(AUTH_TOKEN_KEY);
    };

    const syncToken = () => {
        token.value = localStorage.getItem(AUTH_TOKEN_KEY) ?? '';
    };

    return { token, isAuthenticated, login, logout, syncToken };
});

export default useAuthStore;
