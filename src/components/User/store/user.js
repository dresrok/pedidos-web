const user = {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    userFullName(state) {
      if (state.user) {
        return state.user.person.person_full_name
      }
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    DESTROY_USER(state) {
      state.user = null
    }
  },
  actions: {}
}

export default user
