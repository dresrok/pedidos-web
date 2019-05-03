import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import es from 'vee-validate/dist/locale/es'
import maxDimensionsRule from '@/plugins/maxDimensionsRule'

Vue.use(VeeValidate)

Validator.localize('es', es)

Validator.extend('max_dimensions', maxDimensionsRule)
