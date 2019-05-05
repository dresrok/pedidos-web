import Vue from 'vue'
import Vuex from 'vuex'

import layout from '@/components/Core/Layout/store/layout.js'
import auth from '@/components/Auth/store/auth.js'
import user from '@/components/User/store/user.js'
import company from '@/components/Company/store/company.js'
import category from '@/components/Category/store/category.js'
import product from '@/components/Product/store/product.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    user,
    company,
    category,
    product
  }
})
