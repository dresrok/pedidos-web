import Vue from 'vue'
import _ from 'lodash'

const vueLodash = {}

vueLodash.install = function(Vue) {
  Vue.prototype.$_ = _
}

Vue.use(vueLodash)
