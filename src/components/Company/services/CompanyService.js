import { apolloClient } from '@/plugins/vue-apollo'

import { COMPANY_BY_USER_ID } from '@/components/Company/graphql/queries'

const companyService = {}

companyService.retrieveData = (context, payload) => {
  if (!context.state.company) {
    return apolloClient
      .query({
        query: COMPANY_BY_USER_ID,
        variables: {
          userId: payload.userId
        }
      })
      .then(({ data: { company } }) => {
        context.commit('SET_COMPANY', company)
        return company
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

export default companyService
