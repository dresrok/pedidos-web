import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Auth/SignIn.vue'

import store from '@/store'
import { init } from '@/components/Auth/guards/AuthGuard'

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
      // route level code-splitting
      // this generates a separate chunk (signOut.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(
          /* webpackChunkName: "signOut" */ '@/components/Auth/SignOut.vue'
        )
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (signOut.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "signOut" */ '@/views/Dashboard.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

init(router, store)

export default router
