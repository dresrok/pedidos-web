import gql from 'graphql-tag'

/* CompanyByUserId Query */
export const COMPANY_BY_USER_ID = gql`
  query($userId: ID!) {
    company: companyByUserId(user_id: $userId) {
      company_id
      company_legal_name
      company_commercial_name
      company_identification
      company_slug
      company_image
      city
      company_is_certified
      offices {
        office_id
        office_name
        office_email
        office_open_from
        office_open_to
        office_delivery_time
        office_minimum_order_price
        city
        business_types {
          business_type_id
          business_type_machine_name
          business_type_normalized_name
          business_type_name
        }
      }
    }
  }
`
