import { apolloClient, onLogin, onLogout } from '@/plugins/vue-apollo'

import {
  LOGINQL,
  LOGOUTQL,
  REFRESHTOKENQL
} from '@/components/Auth/graphql/mutations'

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
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {
      apolloClient
        .mutate({
          mutation: LOGINQL,
          variables: {
            username: credentials.username,
            password: credentials.password,
            client_name: credentials.client_name
          }
        })
        .then(({ data: { login } }) => {
          localStorage.setItem('auth-payload', JSON.stringify(login))
          onLogin(apolloClient, login.token.access_token)
          context.commit('retrieveToken', login.token.access_token)
          return login
        })
        .catch(error => {
          console.error(error)
          return error
        })
    },
    destroyToken(context) {
      apolloClient
        .mutate({
          mutation: LOGOUTQL
        })
        .then(data => {
          localStorage.removeItem('auth-payload')
          onLogout(apolloClient)
          context.commit('destroyToken')
          return data
        })
        .catch(error => {
          console.error(error)
          return error
        })
    },
    destroyPayload(context) {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('auth-payload')
        onLogout(apolloClient)
        context.commit('destroyToken')
        resolve('destroy payload')
      })
    },
    refreshToken(context, authPayload) {
      apolloClient
        .mutate({
          mutation: REFRESHTOKENQL,
          variables: {
            refresh_token: authPayload.refreshToken
          }
        })
        .then(({ data: { refreshToken } }) => {
          localStorage.setItem('auth-payload', JSON.stringify(refreshToken))
          onLogin(apolloClient, refreshToken.access_token)
          context.commit('retrieveToken', refreshToken.access_token)
          return refreshToken
        })
        .catch(error => {
          console.error(error)
          return error
        })
    }
  }
}

export default auth
