import { gql } from 'apollo-boost'

/* Login Mutation */
export const LOGINQL = gql`
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
    }
  }
`

/* LogOut Mutation */
export const LOGOUTQL = gql`
  mutation {
    logout {
      message
      status
    }
  }
`

/* RefreshToken Mutation */
export const REFRESHTOKENQL = gql`
  mutation {
    logout {
      message
      status
    }
  }
`
