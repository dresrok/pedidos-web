import { apolloClient, onLogin, onLogout } from '@/plugins/vue-apollo'

import {
  LOGIN,
  LOGOUT,
  REFRESH_TOKEN
} from '@/components/Auth/graphql/mutations'

const AuthService = {}

AuthService.retrieveToken = (context, payload) => {
  return apolloClient
    .mutate({
      mutation: LOGIN,
      variables: {
        username: payload.username,
        password: payload.password,
        client_name: payload.client_name
      }
    })
    .then(({ data: { login } }) => {
      localStorage.setItem('auth-payload', JSON.stringify(login))
      onLogin(apolloClient, login.token.access_token)
      context.commit('SET_TOKEN', login.token.access_token)
      return login
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

AuthService.destroyToken = context => {
  return apolloClient
    .mutate({
      mutation: LOGOUT
    })
    .then(data => {
      localStorage.removeItem('auth-payload')
      onLogout(apolloClient)
      context.commit('DESTROY_TOKEN')
      return data
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

AuthService.refreshToken = (context, payload) => {
  return apolloClient
    .mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        refresh_token: payload.refreshToken
      }
    })
    .then(({ data: { refreshToken } }) => {
      localStorage.setItem('auth-payload', JSON.stringify(refreshToken))
      onLogin(apolloClient, refreshToken.access_token)
      context.commit('SET_TOKEN', refreshToken.access_token)
      return refreshToken
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

AuthService.destroyPayload = context => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('auth-payload')
    onLogout(apolloClient)
    context.commit('DESTROY_TOKEN')
    resolve('destroy payload')
  })
}

export default AuthService
