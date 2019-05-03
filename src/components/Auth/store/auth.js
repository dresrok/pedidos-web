import authService from '@/components/Auth/services/AuthService'

const auth = {
  namespaced: true,
  state: {
    loading: false,
    token: localStorage.getItem('apollo-token') || null
  },
  getters: {
    getLoading(state) {
      return state.loading
    },
    getIsAuthenticated(state) {
      return state.token !== null
    }
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
    },
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    DESTROY_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    signIn(context, payload) {
      return authService.retrieveToken(context, payload)
    },
    signOut(context) {
      return authService.destroyToken(context)
    },
    destroyPayload(context) {
      return authService.destroyPayload(context)
    },
    refreshToken(context, payload) {
      return authService.refreshToken(context, payload)
    }
  }
}

export default auth
