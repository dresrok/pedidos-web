const company = {
  namespaced: true,
  state: {
    company: null
  },
  mutations: {
    SET_COMPANY(state, payload) {
      state.company = payload
    },
    DESTROY_COMPANY(state) {
      state.company = null
    }
  },
  actions: {}
}

export default company
