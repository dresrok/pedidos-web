const layout = {
  namespaced: true,
  state: {
    drawer: false
  },
  getters: {
    getDrawer(state) {
      return state.drawer
    }
  },
  mutations: {
    TOGGLE_DRAWER(state, payload) {
      state.drawer = payload
    }
  },
  actions: {
    toggleDrawer(context, payload) {
      context.commit('TOGGLE_DRAWER', payload)
    }
  }
}

export default layout
