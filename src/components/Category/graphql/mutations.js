import gql from 'graphql-tag'

/* createCategory Mutation */
export const CREATE_CATEGORY = gql`
  mutation($categoryName: String!, $categoryImage: Upload, $officeId: ID!) {
    createCategory(
      category_name: $categoryName
      category_image: $categoryImage
      office_id: $officeId
    ) {
      category_id
      category_name
      category_order
    }
  }
`
