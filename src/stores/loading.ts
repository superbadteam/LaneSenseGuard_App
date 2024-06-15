// refactor user store
import { defineStore } from 'pinia';

export const useLoadingStore = defineStore({
    id: 'loading',
    state: () => ({
       isLoading: false,
    }),
    actions: {
        setLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },
        setIsLoading(isLoading: boolean) {
            this.isLoading = isLoading;
        },
    },
    getters: {
        getLoading: (state) => state.isLoading
    },
});
