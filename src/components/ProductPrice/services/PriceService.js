import { apolloClient } from '@/plugins/vue-apollo'

import {
  CREATE_PRICE,
  UPDATE_PRICE,
  DELETE_PRICE
} from '@/components/ProductPrice/graphql/mutations'

const priceService = {}

priceService.createPrice = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: CREATE_PRICE,
      variables: {
        productPriceAmount: payload.product_price_amount,
        productId: payload.product_id
      }
    })
    .then(({ data: { price } }) => {
      context.commit('product/CREATE_PRICE', price, { root: true })
      context.dispatch('deletePrice', { payload })
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha creado con éxito el nuevo precio!'
        },
        { root: true }
      )
      return price
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_LOADING', false)
    })
}

priceService.updatePrice = (context, { payload }) => {
  context.commit('TOGGLE_LOADING', true)
  return apolloClient
    .mutate({
      mutation: UPDATE_PRICE,
      variables: {
        productPriceId: payload.product_price_id,
        productPriceAmount: payload.product_price_amount
      }
    })
    .then(({ data: { price } }) => {
      context.commit('product/UPDATE_PRICE', price, { root: true })
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha actualizado con éxito el precio!'
        },
        { root: true }
      )
      return price
    })
    .catch(error => {
      console.error(error)
      return error
    })
    .finally(() => {
      context.commit('TOGGLE_LOADING', false)
    })
}

priceService.deletePrice = (context, { payload }) => {
  return apolloClient
    .mutate({
      mutation: DELETE_PRICE,
      variables: {
        productPriceId: payload.product_price_id
      }
    })
    .then(({ data: { price } }) => {
      context.commit('product/UPDATE_PRICE', price, { root: true })
      return price
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

export default priceService
