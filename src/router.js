import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Auth/SignIn.vue'

import store from '@/store'
import { init } from '@/components/Auth/guards/AuthGuard'
import routeGuard from '@/components/Core/guards/RouteGuard'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: SignIn,
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () =>
        import(
          /* webpackChunkName: "signOut" */ '@/components/Auth/SignOut.vue'
        )
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () =>
        import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      },
      beforeEnter: routeGuard.beforeEnter
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () =>
        import(/* webpackChunkName: "categories" */ '@/views/Categories.vue'),
      meta: {
        requiresAuth: true
      },
      beforeEnter: routeGuard.beforeEnter
    },
    {
      path: '/productos',
      name: 'productos',
      component: () =>
        import(/* webpackChunkName: "products" */ '@/views/Products.vue'),
      meta: {
        requiresAuth: true
      },
      beforeEnter: routeGuard.beforeEnter
    },
    {
      path: '/mi-restaurante',
      name: 'mi-restaurante',
      component: () =>
        import(/* webpackChunkName: "mi-restaurante" */ '@/views/Company.vue'),
      meta: {
        requiresAuth: true
      },
      beforeEnter: routeGuard.beforeEnter
    }
  ]
})

init(router, store)

export default router
