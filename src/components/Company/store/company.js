import companyService from '@/components/Company/services/CompanyService'

const company = {
  namespaced: true,
  state: {
    company: null
  },
  getters: {
    getCompanyName(state) {
      return state.company ? state.company.company_legal_name : ''
    },
    getCompanyIdentification(state) {
      return state.company ? state.company.company_identification : ''
    },
    getOfficeId(state) {
      return state.company ? state.company.offices[0].office_id : ''
    }
  },
  mutations: {
    SET_COMPANY(state, payload) {
      state.company = payload
    },
    DESTROY_COMPANY(state) {
      state.company = null
    }
  },
  actions: {
    retrieveData(context, payload) {
      return companyService.retrieveData(context, payload)
    }
  }
}

export default company
