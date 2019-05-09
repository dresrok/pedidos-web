import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    errors: {
      graph: {
        invalid_credentials: 'The user credentials were incorrect.'
      },
      network: {
        failed_to_fetch: 'Failed to fetch.'
      }
    }
  },
  es: {
    errors: {
      graph: {
        invalid_credentials:
          'Estas credenciales no coinciden con nuestros registros.'
      },
      network: {
        failed_to_fetch: 'Fallo de conexión.'
      }
    }
  }
}

const i18n = new VueI18n({
  messages,
  locale: 'es'
})

export default i18n
