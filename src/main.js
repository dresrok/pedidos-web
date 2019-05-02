import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/vee-validate'
import { apolloClient } from '@/plugins/vue-apollo'

import App from '@/App'
import router from '@/router'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: apolloClient,
  render: h => h(App)
}).$mount('#app')
