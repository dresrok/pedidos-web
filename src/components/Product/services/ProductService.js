import { apolloClient } from '@/plugins/vue-apollo'

import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from '@/components/Product/graphql/mutations'
import { PAGINATE_PRODUCTS } from '@/components/Product/graphql/queries'

const productService = {}

productService.paginateProducts = (context, payload) => {
  context.commit('TOGGLE_PENDING', true)
  return apolloClient
    .query({
      query: PAGINATE_PRODUCTS,
      variables: {
        count: context.state.pagination.rowsPerPage,
        page: payload.productName ? null : context.state.pagination.page,
        officeId: payload.officeId,
        categoryId: payload.categoryId,
        productName: payload.productName
      }
    })
    .then(({ data: { products } }) => {
      context.commit('PAGINATE_PRODUCTS', products)
      return products
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_PENDING', false)
    })
}

productService.createProduct = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        productName: payload.get('product_name'),
        productDescription: payload.get('product_description'),
        productPrice: payload.get('product_price'),
        productImage: payload.get('product_image'),
        categoryId: payload.get('category_id'),
        officeId: context.rootGetters['company/getOfficeId']
      }
    })
    .then(({ data: { product } }) => {
      context.commit('CREATE_PRODUCT', product)
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha creado con éxito el producto!'
        },
        { root: true }
      )
      return product
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_LOADING', false)
    })
}

productService.updateProduct = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        productId: payload.get('product_id'),
        productName: payload.get('product_name'),
        productDescription:
          payload.get('product_description') === 'null'
            ? null
            : payload.get('product_description'),
        productImage: payload.get('product_image'),
        categoryId: payload.get('category_id')
      }
    })
    .then(({ data: { product } }) => {
      context.commit('UPDATE_PRODUCT', product)
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha actualizado con éxito el producto!'
        },
        { root: true }
      )
      return product
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_LOADING', false)
    })
}

export default productService
