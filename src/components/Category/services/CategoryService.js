import { apolloClient } from '@/plugins/vue-apollo'

import {
  CREATE_CATEGORY,
  UPDATE_CATEGORY
} from '@/components/Category/graphql/mutations'
import { CATEGORIES } from '@/components/Category/graphql/queries'

const categoryService = {}

categoryService.retrieveData = (context, payload) => {
  context.commit('TOGGLE_PENDING', true)
  return apolloClient
    .query({
      query: CATEGORIES,
      variables: {
        count: context.state.pagination.rowsPerPage,
        page: payload.categoryName ? null : context.state.pagination.page,
        officeId: payload.officeId,
        categoryName: payload.categoryName
      }
    })
    .then(({ data: { categories } }) => {
      context.commit('RETRIEVE_DATA', categories)
      return categories
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_PENDING', false)
    })
}

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
      context.commit('CREATE_CATEGORY', category)
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

categoryService.updateCategory = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: UPDATE_CATEGORY,
      variables: {
        categoryId: payload.get('category_id'),
        categoryName: payload.get('category_name'),
        categoryImage: payload.get('category_image')
      }
    })
    .then(({ data: { category } }) => {
      context.commit('UPDATE_CATEGORY', category)
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
