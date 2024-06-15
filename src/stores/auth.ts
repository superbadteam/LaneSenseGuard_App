import { defineStore } from 'pinia';
export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        returnUrl: '',
    }),
    actions: {
        async login(email: string, password: string) {},
        logout() {
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('access_token');
            location.reload();
            // router.push("/login")
        },
    },
});
