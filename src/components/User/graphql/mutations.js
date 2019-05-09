import gql from 'graphql-tag'

/* updatePerson Mutation */
export const UPDATE_PERSON = gql`
  mutation(
    $personId: ID!
    $personFirstName: String!
    $personLastName: String!
    $personIdentification: String!
  ) {
    person: updatePerson(
      id: $personId
      person_first_name: $personFirstName
      person_last_name: $personLastName
      person_identification: $personIdentification
    ) {
      person_id
      person_first_name
      person_last_name
      person_legal_name
      person_full_name
      person_identification
      person_description
    }
  }
`

/* changePassword Mutation */
export const CHANGE_PASSWORD = gql`
  mutation($currentPassword: String!, $newPassword: String!) {
    user: changePassword(
      current_password: $currentPassword
      new_password: $newPassword
    ) {
      user_id
      email
    }
  }
`
