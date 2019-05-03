import gql from 'graphql-tag'

/* Categories Query */
export const CATEGORIES = gql`
  query($count: Int!, $page: Int, $officeId: ID!) {
    categories(count: $count, page: $page, office_id: $officeId) {
      data {
        category_id
        category_name
        category_image_name
        category_image_mini
        category_image_medium
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
