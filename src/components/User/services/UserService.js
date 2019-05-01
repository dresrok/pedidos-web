import { apolloClient } from '@/plugins/vue-apollo'

import { ME } from '@/components/User/graphql/queries'

const UserService = {}

UserService.retrieveData = context => {
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

export default UserService
