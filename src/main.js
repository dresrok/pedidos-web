import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/vuetify-algolia-places'
import '@/plugins/vee-validate'
import { apolloClient } from '@/plugins/vue-apollo'
import i18n from '@/plugins/vue-i18n'

import App from '@/App'
import router from '@/router'
import store from '@/store'

import BaseSnackbar from '@/components/Core/Layout/Base/BaseSnackbar'

Vue.component('BaseSnackbar', BaseSnackbar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider: apolloClient,
  i18n,
  render: h => h(App)
}).$mount('#app')
