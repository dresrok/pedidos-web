import { apolloClient } from '@/plugins/vue-apollo'

import { BUSINESS_TYPES } from '@/components/BusinessType/graphql/queries'

const businessTypeService = {}

businessTypeService.retrieveData = (context, payload) => {
  return apolloClient
    .query({
      query: BUSINESS_TYPES
    })
    .then(({ data: { businessTypes } }) => {
      context.commit('SET_BUSINESS_TYPES', businessTypes)
      return businessTypes
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

export default businessTypeService
