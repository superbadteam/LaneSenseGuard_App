import { useUserStore } from '@/stores';
import type { NavigationGuardWithThis } from 'vue-router';

const ADMIN = 1

export const adminGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
    document.title = `SafeSurf`
    const userStore = useUserStore()
    console.log('adminGuard')

    if (userStore.user?.role !== ADMIN) {
        next('/')
    } else {
        next()
    }
}
