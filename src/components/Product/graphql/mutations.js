import gql from 'graphql-tag'

/* createProduct Mutation */
export const CREATE_PRODUCT = gql`
  mutation(
    $productName: String!
    $productDescription: String
    $productPrice: Float!
    $productImage: Upload
    $categoryId: ID!
    $officeId: ID!
  ) {
    product: createProduct(
      product_name: $productName
      product_description: $productDescription
      product_price: $productPrice
      product_image: $productImage
      category_id: $categoryId
      office_id: $officeId
    ) {
      product_id
      product_name
      product_description
      product_image_name
      product_image_mini
      product_image_medium
      category {
        category_id
        category_name
      }
      prices {
        product_price_id
        product_price_amount
      }
    }
  }
`

/* updateProduct Mutation */
export const UPDATE_PRODUCT = gql`
  mutation(
    $productId: ID!
    $productName: String!
    $productDescription: String
    $productImage: Upload
    $categoryId: ID!
  ) {
    product: updateProduct(
      id: $productId
      product_name: $productName
      product_description: $productDescription
      product_image: $productImage
      category_id: $categoryId
    ) {
      product_id
      product_name
      product_description
      product_image_name
      product_image_mini
      product_image_medium
      category {
        category_id
        category_name
      }
      prices {
        product_price_id
        product_price_amount
      }
    }
  }
`
