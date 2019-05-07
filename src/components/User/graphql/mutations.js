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
