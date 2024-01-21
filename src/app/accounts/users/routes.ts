export default
    [
        {
            path: '/users',
            name: 'users_list',
            meta: {
                loadingType: 'card',
                breadcrumbs: [{ label: "users_list", to: { name: 'users_list' } }],

            },
            component: () => import('./UsersListView.vue')
        },
        {
            path: '/users/create',
            name: 'user_create',
            meta: {
                loadingType: 'form',
                breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "User Create" }],
            },
            component: () => import('./UserCreateView.vue')
        },
        {
            path: '/users/:id/update',
            name: 'user_update',
            meta: {
                loadingType: 'form',
                breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "update" }]
            },
            component: () => import('./UserUpdateView.vue')
        },
        {
            path: '/users/:id/update',
            name: 'user_update',
            meta: {
                loadingType: 'form',
                breadcrumbs: [{ label: "users", to: { name: 'users_list' } }, { label: "update" }]
            },
            component: () => import('./UserUpdateView.vue')
        },
        {
            path: '/profile',
            name: 'profile_view',
            component: () => import('./ProfileView.vue')
        },
]
