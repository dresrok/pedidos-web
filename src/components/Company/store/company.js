import companyService from '@/components/Company/services/CompanyService'

const company = {
  namespaced: true,
  state: {
    company: null,
    loading: false
  },
  getters: {
    getCompany(state) {
      return state.company ? state.company : {}
    },
    getCompanyName(state) {
      return state.company ? state.company.company_legal_name : ''
    },
    getCompanyIdentification(state) {
      return state.company ? state.company.company_identification : ''
    },
    getOfficeId(state) {
      return state.company ? state.company.offices[0].office_id : ''
    },
    getLoading(state) {
      return state.loading
    }
  },
  mutations: {
    SET_COMPANY(state, payload) {
      state.company = payload
    },
    DESTROY_COMPANY(state) {
      state.company = null
    },
    SET_PERSON(state, payload) {
      state.company.offices[0].users[0].person = payload
    },
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    retrieveData(context, payload) {
      return companyService.retrieveData(context, payload)
    },
    registerCompany(context, payload) {
      return companyService.registerCompany(context, payload)
    },
    updateCompany(context, payload) {
      return companyService.updateCompany(context, payload)
    }
  }
}

export default company
