import { authGuard } from '../auth.guard'
export const dashboardRoute =  { 
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: [authGuard],
    children: [
        {
            path: 'signin', 
            component: () => import('@/views/Authentication/SigninView.vue'),
            name: 'signin',
            meta: {
                parent: 'dashboard'
            }
        },
        {
            path: 'filter', 
            name: 'dashboard-filter',
            component: () => import('@/views/Dashboard/ContentFilterView.vue'),
            meta: {
                parent: 'dashboard'
            }
        },
        {
            path: 'web-activity', 
            name: 'web-activity',
            meta: {
                parent: 'dashboard'
            },
            component: () => import('@/views/Admin/WebActivityView.vue'),
        },
    ]
}