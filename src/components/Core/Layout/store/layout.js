const layout = {
  namespaced: true,
  state: {
    drawer: false,
    snackbar: {
      show: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 6000,
      color: 'info',
      text: ''
    }
  },
  getters: {
    getDrawer(state) {
      return state.drawer
    },
    getSnackbar(state) {
      return state.snackbar
    }
  },
  mutations: {
    TOGGLE_DRAWER(state, payload) {
      state.drawer = payload
    },
    SET_SNACKBAR(state, payload) {
      state.snackbar = { ...payload }
    }
  },
  actions: {
    toggleDrawer(context, payload) {
      context.commit('TOGGLE_DRAWER', payload)
    },
    setSnackbar(context, payload) {
      context.commit('SET_SNACKBAR', payload)
    }
  }
}

export default layout
