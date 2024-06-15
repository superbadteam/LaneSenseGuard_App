// refactor user store
import { defineStore } from 'pinia';
import type { IUser } from '@/types/user';
import { getInforApi } from '@/services/user';

export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: null as IUser | null,
        token: {
            access: '',
        },
        returnUrl: '',
    }),
    actions: {
        hasRole(role: number) {
            return this.user?.role === role;
        },
        setUser(user: IUser) {
            this.user = user;
        },
        async getInfo() {
            return getInforApi();
        },
        setToken(access: string) {
            if (access) {
                this.token.access = access;
                localStorage.setItem('access_token', access);
            }
        },
    },
});
