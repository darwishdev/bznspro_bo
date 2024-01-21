export default
[
        {
            path: '/settings',
            name: 'Settings',
            meta: {
              loadingType: 'table',
              breadcrumbs: [{ label: "Settings", to: { name: 'Settings' } }],
  
            },
            component: () => import('./SettingsView.vue')
        },
        {
            path: '/translation',
            name: 'translation_management',
            meta: {
              loadingType: 'table',
              breadcrumbs: [{ label: "Translation", to: { name: 'Translation' } }],
  
            },
            component: () => import('./translationManagement.vue')
        },
]
