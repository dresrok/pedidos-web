import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-free/css/all.css'
import es from 'vuetify/es5/locale/es.js'

Vue.use(Vuetify, {
  iconfont: 'fa',
  lang: {
    locales: { es },
    current: 'es'
  }
})
