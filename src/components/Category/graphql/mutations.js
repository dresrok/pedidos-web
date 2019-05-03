import gql from 'graphql-tag'

/* createCategory Mutation */
export const CREATE_CATEGORY = gql`
  mutation($categoryName: String!, $categoryImage: Upload, $officeId: ID!) {
    category: createCategory(
      category_name: $categoryName
      category_image: $categoryImage
      office_id: $officeId
    ) {
      category_id
      category_name
      category_image_name
      category_image_mini
      category_image_medium
    }
  }
`

/* updateCategory Mutation */
export const UPDATE_CATEGORY = gql`
  mutation($categoryId: ID!, $categoryName: String!, $categoryImage: Upload) {
    category: updateCategory(
      id: $categoryId
      category_name: $categoryName
      category_image: $categoryImage
    ) {
      category_id
      category_name
      category_image_name
      category_image_mini
      category_image_medium
    }
  }
`
