import Vue from 'vue'
import '@/plugins/vuetify'
import App from '@/App'
import router from '@/router'
import store from '@/store'

import { apolloClient } from '@/plugins/vue-apollo'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: apolloClient,
  render: h => h(App)
}).$mount('#app')
