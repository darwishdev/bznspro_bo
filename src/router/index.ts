import { createRouter, createWebHistory, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import AppLayout from 'v-dashkit/theme/AppLayout'
import LoginForm from 'v-dashkit/form/LoginForm'
import apiClient from '@/api/ApiClient';

import dashboardRoutes from '@/app/dashboard/routes';
import usersRoutes from '@/app/accounts/users/routes';
import rolesRoutes from '@/app/accounts/roles/routes';
import publicRoutes from '@/app/public/routes';
import eventsRoutes from '@/app/events/routes';

const appRoutes = [
  ...dashboardRoutes,
  ...usersRoutes,
  ...eventsRoutes,
  ...rolesRoutes,
  ...publicRoutes,
]


const authMiddleWare = async (_: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if (from.name != 'login') {
    try {
      const user = await apiClient.userAuthorize({})
      localStorage.setItem('user', JSON.stringify(user))
      next()
      return true

    } catch (e: any) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      next('/login')
      return false
    }
  }
  next()
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      beforeEnter: authMiddleWare,
      children: appRoutes
    },
    {

      path: '/login',
      name: 'login',
      component: LoginForm

    }

  ]
})

export default router
