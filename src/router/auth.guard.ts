import { useUserStore } from '@/stores';
import type { NavigationGuardWithThis } from 'vue-router';
const publicURL = ['/auth/signin', '/auth/signup']
export const authGuard: NavigationGuardWithThis<any> = async (to, from, next) => {
    document.title = `SafeSurf`
    const userStore = useUserStore()
    console.log('authGuard', userStore.user, to)

    
    if (userStore.user) {
        if (publicURL.includes(to.path)) {
            next('/')
        } else {
            next()
        }
    } else {
        if (publicURL.includes(to.path)) {
            next()
        } else {
            next('/auth/signin')
        }
    }
}
