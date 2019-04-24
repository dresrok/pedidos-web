import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '@/components/Auth/SignIn.vue'
import SignOut from '@/components/Auth/SignOut.vue'

import Dashboard from '@/views/Dashboard.vue'

Vue.use(Router)

export default new Router({
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
      component: SignOut
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
