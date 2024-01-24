export default
  [
    {
      path: '/services',
      name: 'services_list',
      meta: {
        loadingType: 'table',
        breadcrumbs: [{ label: "services_list", to: { name: 'services_list' } }],

      },
      component: () => import('./ServicesList.vue')
    },
    {
      path: '/services/create',
      name: 'service_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "services", to: { name: 'services_list' } }, { label: "service_create" }],
      },
      component: () => import('./ServiceCreate.vue')
    },
    {
      path: '/services/:id',
      name: 'services_find',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "services", to: { name: 'services_list' } }, { label: "services_find" }],
      },
      component: () => import('./ServiceCreate.vue')
    },
    {
      path: '/services/:id/update',
      name: 'service_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "services", to: { name: 'services_list' } }, { label: "update" }]
      },
      component: () => import('./ServiceUpdate.vue')
    },
  ]
