import Vue from 'vue'
import Vuex from 'vuex'

import layout from '@/components/Core/Layout/store/layout.js'
import auth from '@/components/Auth/store/auth.js'
import user from '@/components/User/store/user.js'
import company from '@/components/Company/store/company.js'
import category from '@/components/Category/store/category.js'
import product from '@/components/Product/store/product.js'

Vue.use(Vuex)

let initialState = {
  layout: layout.state,
  auth: auth.state,
  user: user.state,
  company: company.state
}

export default new Vuex.Store({
  mutations: {
    RESET(state) {
      Object.keys(state).forEach(key => {
        console.log('key ' + key)
        console.dir('initialState ' + initialState[key])
        console.dir('state ' + state[key])
        state[key] = initialState[key]
      })
    }
  },
  modules: {
    layout,
    auth,
    user,
    company,
    category,
    product
  }
})
