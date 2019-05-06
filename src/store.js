import Vue from 'vue'
import Vuex from 'vuex'

import layout from '@/components/Core/Layout/store/layout.js'
import auth from '@/components/Auth/store/auth.js'
import user from '@/components/User/store/user.js'
import company from '@/components/Company/store/company.js'
import category from '@/components/Category/store/category.js'
import product from '@/components/Product/store/product.js'
import price from '@/components/ProductPrice/store/price.js'

Vue.use(Vuex)

const parseAndStringifyState = defaultState =>
  JSON.parse(JSON.stringify(defaultState))

const initialState = {
  layout: parseAndStringifyState(layout.state),
  auth: parseAndStringifyState(auth.state),
  user: parseAndStringifyState(user.state),
  company: parseAndStringifyState(company.state),
  category: parseAndStringifyState(category.state),
  product: {
    ...parseAndStringifyState(product.state),
    price: parseAndStringifyState(price.state)
  }
}

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    user,
    company,
    category,
    product
  },
  mutations: {
    RESET_STATE(state) {
      this.replaceState(initialState)
    }
  }
})
