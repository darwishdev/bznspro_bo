export default
  [
    {
      path: '/programs',
      name: 'programs_list',
      meta: {
        loadingType: 'table',
        breadcrumbs: [{ label: "programs_list", to: { name: 'programs_list' } }],

      },
      component: () => import('./ProgramsList.vue')
    },
    {
      path: '/programs/create',
      name: 'program_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "programs", to: { name: 'programs_list' } }, { label: "program_create" }],
      },
      component: () => import('./ProgramCreate.vue')
    },
    {
      path: '/programs/:id',
      name: 'programs_find',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "programs", to: { name: 'programs_list' } }, { label: "programs_find" }],
      },
      component: () => import('./ProgramCreate.vue')
    },
    {
      path: '/programs/:id/update',
      name: 'program_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "programs", to: { name: 'programs_list' } }, { label: "update" }]
      },
      component: () => import('./ProgramsUpdate.vue')
    },
  ]
