import { authGuard } from '../auth.guard'
export const authRoute =  { 
    path: '/auth',
    name: 'auth',
    beforeEnter: [authGuard],
    children: [
        {
            path: 'signin', 
            component: () => import('@/views/Authentication/SigninView.vue'),
            meta: {
                layout: 'guest'
            }
        },
        {
            path: 'signup', 
            component: () => import('@/views/Authentication/SignupView.vue'),
            meta: {
                layout: 'guest'
            }
        }
    ]
}