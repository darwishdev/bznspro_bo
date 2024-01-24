export default
  [
    {
      path: '/projects',
      name: 'projects_list',
      meta: {
        loadingType: 'table',
        breadcrumbs: [{ label: "projects_list", to: { name: 'projects_list' } }],

      },
      component: () => import('./ProjectsList.vue')
    },
    {
      path: '/projects/create',
      name: 'project_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "projects", to: { name: 'projects_list' } }, { label: "project_create" }],
      },
      component: () => import('./ProjectsCreate.vue')
    },
    {
      path: '/projects/:id/update',
      name: 'project_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "projects", to: { name: 'projects_list' } }, { label: "update" }]
      },
      component: () => import('./ProjectsUpdate.vue')
    },
  ]
