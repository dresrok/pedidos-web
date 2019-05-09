import { apolloClient } from '@/plugins/vue-apollo'

import { getQuery, setVariables } from '@/components/Core/graphql/queries'

const coreService = {}

coreService.validate = (value, [id, query]) => {
  return apolloClient
    .query({
      query: getQuery(query),
      variables: setVariables(query, id, value)
    })
    .then(({ data: { validation } }) => {
      return {
        valid: validation.valid,
        data: {
          message: validation.message
        }
      }
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

export default coreService
