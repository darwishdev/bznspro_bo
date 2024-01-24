export default
  [
    {
      path: '/requests',
      name: 'requests_list',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "requests_list", to: { name: 'requests_list' } }],

      },
      component: () => import('./EventsRequestsList.vue')
    },
    {
      path: '/requests/:id',
      name: 'requests_find',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "requests", to: { name: 'requests_list' } }, { label: "requests_list" }],
      },
      component: () => import('./EventRequestsFind.vue')
    },
  ]
