import authService from '@/components/Auth/services/AuthService'

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('apollo-token') || null,
    loading: false
  },
  getters: {
    getIsAuthenticated(state) {
      return state.token !== null
    },
    getLoading(state) {
      return state.loading
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    DESTROY_TOKEN(state) {
      state.token = null
    },
    TOGGLE_LOADING(state, payload) {
      state.loading = payload
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
