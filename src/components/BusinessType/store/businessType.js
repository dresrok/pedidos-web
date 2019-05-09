import businessTypeService from '@/components/BusinessType/services/BusinessTypeService'

const businessType = {
  namespaced: true,
  state: {
    businessTypes: []
  },
  getters: {
    getBusinessTypes(state) {
      return state.businessTypes
    }
  },
  mutations: {
    SET_BUSINESS_TYPES(state, payload) {
      state.businessTypes = payload
    }
  },
  actions: {
    retrieveData(context, payload) {
      return businessTypeService.retrieveData(context, payload)
    }
  }
}

export default businessType
