import gql from 'graphql-tag'

/* paginateCategories Query */
export const PAGINATE_CATEGORIES = gql`
  query($count: Int!, $page: Int, $officeId: ID!, $categoryName: String) {
    categories: paginateCategories(
      count: $count
      page: $page
      office_id: $officeId
      category_name: $categoryName
    ) {
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
