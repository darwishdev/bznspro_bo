export default
  [
    {
      path: '/team',
      name: 'team_members_list',
      meta: {
        loadingType: 'table',
        breadcrumbs: [{ label: "team_members_list", to: { name: 'team_members_list' } }],

      },
      component: () => import('./TeamMembersList.vue')
    },
    {
      path: '/teamMember/create',
      name: 'team_member_create',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "team", to: { name: 'team_members_list' } }, { label: "team_member_create" }],
      },
      component: () => import('./TeamMemberCreate.vue')
    },
    {
      path: '/teamMember/:id/update',
      name: 'team_member_update',
      meta: {
        loadingType: 'form',
        breadcrumbs: [{ label: "team", to: { name: 'team_members_list' } }, { label: "update" }]
      },
      component: () => import('./TeamMemberUpdate.vue')
    },
  ]
