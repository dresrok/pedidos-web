import gql from 'graphql-tag'

/* Login Mutation */
export const LOGIN = gql`
  mutation($username: String!, $password: String!, $client_name: String!) {
    login(
      input: {
        username: $username
        password: $password
        client_name: $client_name
      }
    ) {
      token {
        access_token
        token_type
        expires_in
        refresh_token
      }
      me {
        user_id
        email
        person {
          person_first_name
          person_last_name
          person_legal_name
          person_full_name
          person_identification
          person_description
        }
        profile {
          profile_id
          profile_machine_name
          profile_name
          menus {
            menu_id
            menu_name
            menu_uri
            menu_icon
            menu_order
            sub_menus {
              menu_id
              menu_name
              menu_uri
              menu_icon
              menu_order
            }
          }
        }
      }
      company {
        company_id
        company_legal_name
        company_commercial_name
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
  }
`

/* LogOut Mutation */
export const LOGOUT = gql`
  mutation {
    logout {
      message
      status
    }
  }
`

/* RefreshToken Mutation */
export const REFRESH_TOKEN = gql`
  mutation($refresh_token: String!) {
    refreshToken(data: { refresh_token: $refresh_token }) {
      access_token
      token_type
      expires_in
      refresh_token
    }
  }
`
