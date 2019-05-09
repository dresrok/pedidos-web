import gql from 'graphql-tag'

/* businessTypes Query */
export const BUSINESS_TYPES = gql`
  query {
    businessTypes {
      business_type_id
      business_type_name
    }
  }
`
