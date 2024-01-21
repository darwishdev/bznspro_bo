export default
  [
    {
      path: '/events',
      name: 'events_list',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "events_list", to: { name: 'events_list' } }],

      },
      component: () => import('./EventsListView.vue')
    },
    {
      path: '/events/create',
      name: 'event_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "events", to: { name: 'events_list' } }, { label: "event_create" }],
      },
      component: () => import('./EventCreateView.vue')
    },
    {
      path: '/events/:id',
      name: 'events_find',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "events", to: { name: 'events_list' } }, { label: "event_find" }],
      },
      component: () => import('./EventCreateView.vue')
    },
    {
      path: '/events/:id/update',
      name: 'event_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "events", to: { name: 'events_list' } }, { label: "update" }]
      },
      component: () => import('./EventUpdateView.vue')
    },
  ]
