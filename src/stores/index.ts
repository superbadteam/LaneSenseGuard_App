import { useAuthStore } from './auth';
import { useUserStore } from './user';
import { useSocketStore } from './ws';

export const initAuthStore = async () => {
    const userStore = useUserStore();
    const socketStore = useSocketStore();
    const { logout } = useAuthStore();
    const access_token = localStorage.getItem('access_token') as string;
    try {
        if (access_token) {
            userStore.setToken(access_token);
            //   try {
            const user = await userStore.getInfo();
            userStore.setUser(user);
            socketStore.setRasID(Number(user.rasId));
            console.log('LOG: user', user);
            //     authStore.setAuthStore({
            //       user: data,
            //       isLoggedIn: true,
            //     })
            //   } catch (error) {
            //     console.log(error)
            //     localStorage.removeItem('access_token')
            //     localStorage.removeItem('refresh_token')
            //     window.location.reload()
            //   }
            //   console.log('initAuthStore', authStore)
            // }
        }
    } catch (error) {
        console.log(error);
    }
};

export { useAuthStore } from './auth';
export { useUserStore } from './user';
