import Vue from 'vue'
import '@/plugins/vuetify'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import { apolloClient } from '@/plugins/vue-apollo'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters['auth/isLoggedIn']
  ) {
    next({
      name: 'home'
    })
  } else if (
    to.matched.some(record => record.meta.requiresVisitor) &&
    store.getters['auth/isLoggedIn']
  ) {
    next({
      name: 'dashboard'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  apolloProvider: apolloClient,
  render: h => h(App)
}).$mount('#app')
