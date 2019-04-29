import AuthService from '@/components/Auth/services/AuthService'

const auth = {
  namespaced: true,
  state: {
    token: localStorage.getItem('apollo-token') || null
  },
  getters: {
    isLoggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    DESTROY_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    signIn(context, payload) {
      return AuthService.retrieveToken(context, payload)
    },
    signOut(context) {
      return AuthService.destroyToken(context)
    },
    destroyPayload(context) {
      return AuthService.destroyPayload(context)
    },
    refreshToken(context, payload) {
      return AuthService.refreshToken(context, payload)
    }
  }
}

export default auth
