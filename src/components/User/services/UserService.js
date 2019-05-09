import { apolloClient } from '@/plugins/vue-apollo'

import {
  UPDATE_PERSON,
  CHANGE_PASSWORD
} from '@/components/User/graphql/mutations'
import { ME } from '@/components/User/graphql/queries'

const userService = {}

userService.retrieveData = context => {
  if (!context.state.user) {
    return apolloClient
      .query({
        query: ME
      })
      .then(({ data: { me } }) => {
        context.commit('SET_USER', me)
        return me
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

userService.updatePerson = (context, { payload }) => {
  return apolloClient
    .mutate({
      mutation: UPDATE_PERSON,
      variables: {
        personId: payload.person_id,
        personFirstName: payload.person_first_name,
        personLastName: payload.person_last_name,
        personIdentification: payload.person_identification
      }
    })
    .then(({ data: { person } }) => {
      context.commit('SET_PERSON', person)
      context.commit('company/SET_PERSON', person, { root: true })
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha actualizado con éxito el usuario!'
        },
        { root: true }
      )
      return person
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

userService.changePassword = (context, { payload }) => {
  return apolloClient
    .mutate({
      mutation: CHANGE_PASSWORD,
      variables: {
        currentPassword: payload.current_password,
        newPassword: payload.new_password
      }
    })
    .then(({ data: { user } }) => {
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha actualizado con éxito la contraseña!'
        },
        { root: true }
      )
      return user
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

export default userService
