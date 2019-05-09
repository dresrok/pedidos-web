import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'
import maxDimensionsRule from '@/plugins/vee-validate/rules/maxDimensionsRule'
import uniqueRule from '@/plugins/vee-validate/rules/uniqueRule'

Vue.use(VeeValidate)

es.messages.is_not = () => `La nueva contraseña no puede ser igual`

Validator.localize('es', es)

Validator.extend('max_dimensions', maxDimensionsRule)
Validator.extend('unique', uniqueRule)
