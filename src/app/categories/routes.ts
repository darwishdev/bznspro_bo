export default
  [
    {
      path: '/categories/projects',
      name: 'category_projects_list',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "projects_list", to: { name: 'projects_list' } }],

      },
      component: () => import('./projects/ProjectsList.vue')
    },
    {
      path: '/categories/blog',
      name: 'categories_blog',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "categories_blog", to: { name: 'categories_blog' } }],
      },
      component: () => import('./blogs/BlogsList.vue')
    },

    {
      path: '/blog/:id',
      name: 'blog_find',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "blogs_list", to: { name: 'blogs_list' } }, { label: "Find" }]
      },
      component: () => import('./blogs/BlogsList.vue')
    },
    {
      path: '/categories',
      name: 'categories_list',
      meta: {
        loadingType: 'card',
        breadcrumbs: [{ label: "categories_list", to: { name: 'categories_list' } }],

      },
      component: () => import('./CategoriesList.vue')
    },
    {
      path: '/categories/create',
      name: 'category_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Create" }],
      },
      component: () => import('./CategoryCreate.vue')
    },
    {
      path: '/categories/:id/update',
      name: 'category_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "categories", to: { name: 'categories_list' } }, { label: "Update" }]
      },
      component: () => import('./CategoryUpdate.vue')
    },
  ]
