export default
  [
    {
      path: '/testemonials',
      name: 'testemonials_list',
      meta: {
        loadingType: 'table',
        breadcrumbs: [{ label: "testemonials_list", to: { name: 'testemonials_list' } }],

      },
      component: () => import('./TestemonialsList.vue')
    },
    {
      path: '/testemonials/create',
      name: 'testemonial_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "testemonials", to: { name: 'testemonials_list' } }, { label: "testemonial_create" }],
      },
      component: () => import('./TestemonialsList.vue')
    },
    {
      path: '/testemonials/:id/update',
      name: 'testemonial_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "testemonials", to: { name: 'testemonials_list' } }, { label: "update" }]
      },
      component: () => import('./TestemonialsUpdate.vue')
    },
  ]
