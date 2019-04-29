import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/components/Auth/store/auth.js'
import user from '@/components/User/store/user.js'
import company from '@/components/Company/store/company.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    company
  }
})
