export default
  [
    {
      path: '/blog',
      name: 'blogs_list',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "blogs_list", to: { name: 'blogs_list' } }],

      },
      component: () => import('./BlogsList.vue')
    },
    {
      path: '/blogs/create',
      name: 'blog_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "blogs", to: { name: 'blogs_list' } }, { label: "create" }],
      },
      component: () => import('./BlogCreate.vue')
    },
    {
      path: '/blogs/:id/update',
      name: 'blog_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "blogs", to: { name: 'blogs_list' } }, { label: "update" }]
      },
      component: () => import('./BlogsUpdate.vue')
    },
  ]
