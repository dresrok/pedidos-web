import gql from 'graphql-tag'

/* paginateProducts Query */
export const PAGINATE_PRODUCTS = gql`
  query(
    $count: Int!
    $page: Int
    $officeId: ID!
    $categoryId: ID
    $productName: String
  ) {
    products: paginateProducts(
      count: $count
      page: $page
      office_id: $officeId
      category_id: $categoryId
      product_name: $productName
    ) {
      data {
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
          product_price_status
          product_id
        }
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`
