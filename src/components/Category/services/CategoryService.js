import { apolloClient } from '@/plugins/vue-apollo'

import { CREATE_CATEGORY } from '@/components/Category/graphql/mutations'

const categoryService = {}

categoryService.createCategory = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: CREATE_CATEGORY,
      variables: {
        categoryName: payload.get('category_name'),
        categoryImage: payload.get('category_image'),
        officeId: context.rootGetters['company/getOfficeId']
      }
    })
    .then(({ data: { category } }) => {
      return category
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_LOADING', false)
    })
}

export default categoryService
