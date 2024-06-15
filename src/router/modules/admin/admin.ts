import { authGuard } from '../../auth.guard';
import { adminGuard } from '../../admin.guard'
export const adminChildrenRoute =  { 
    path: '/admin',
    name: 'admin',
    beforeEnter: [authGuard, adminGuard],
    children: [
        {
            path: 'users', 
            name: 'users',
            component: () => import('@/views/Admin/UsersView.vue'),
        },
        {
            path: 'users/:id', 
            name: 'users-detail',
            component: () => import('@/views/Admin/UserDetailView.vue'),
        },
        {
            path: 'categories', 
            name: 'categories',
            component: () => import('@/views/Admin/CategoriesView.vue'),
        },
        {
            path: 'categories/:id', 
            name: 'categories-detail',
            component: () => import('@/views/Admin/CategoryDetailView.vue'),
        },
        {
            path: 'subscriptions', 
            name: 'subscriptions',
            component: () => import('@/views/Admin/SubscriptionsView.vue'),
        },
        {
            path: 'subscriptions/:id', 
            name: 'subscriptions-detail',
            // component: () => import('@/views/Admin/SubscriptionDetailView.vue'),
        },
        {
            path: 'filters', 
            name: 'filters',
            // component: () => import('@/views/Admin/FiltersView.vue'),
        },
        
    ]
}