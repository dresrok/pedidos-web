import gql from 'graphql-tag'

/* createProductPrice Mutation */
export const CREATE_PRICE = gql`
  mutation($productPriceAmount: Float!, $productId: ID!) {
    price: createProductPrice(
      product_price_amount: $productPriceAmount
      product_id: $productId
    ) {
      product_price_id
      product_price_amount
      product_price_status
      product_id
    }
  }
`

/* updateProductPrice Mutation */
export const UPDATE_PRICE = gql`
  mutation($productPriceId: ID!, $productPriceAmount: Float!) {
    price: updateProductPrice(
      id: $productPriceId
      product_price_amount: $productPriceAmount
    ) {
      product_price_id
      product_price_amount
      product_price_status
      product_id
    }
  }
`

/* deleteProductPrice Mutation */
export const DELETE_PRICE = gql`
  mutation($productPriceId: ID!) {
    price: deleteProductPrice(id: $productPriceId) {
      product_price_id
      product_price_amount
      product_price_status
      product_id
    }
  }
`
