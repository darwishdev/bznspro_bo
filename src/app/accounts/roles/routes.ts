export default
    [
        {
            path: '/roles',
            name: 'roles_list',
            meta: {
              loadingType: 'card',
              breadcrumbs: [{ label: "roles_list", to: { name: 'roles_list' } }],
  
            },
            component: () => import('./RolesListView.vue')
          },
          {
            path: '/roles/create',
            name: 'role_create',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "role_create" }],
            },
            component: () => import('./RoleCreateView.vue')
          },
          {
            path: '/roles/:id/update',
            name: 'role_update',
            meta: {
              loadingType: 'form',
              breadcrumbs: [{ label: "roles", to: { name: 'roles_list' } }, { label: "update" }]
            },
            component: () => import('./RoleUpdateView.vue')
          },
]
