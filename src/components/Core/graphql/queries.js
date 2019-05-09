import gql from 'graphql-tag'

/* validateCompanyIdentification Query */
const VALIDATE_COMPANY_IDENTIFICATION = gql`
  query($companyId: ID, $companyIdentification: String!) {
    validation: validateCompanyIdentification(
      company_id: $companyId
      company_identification: $companyIdentification
    ) {
      valid
      message
    }
  }
`

/* validateOfficeEmail Query */
const VALIDATE_OFFICE_EMAIL = gql`
  query($officeId: ID, $officeEmail: String!) {
    validation: validateOfficeEmail(
      office_id: $officeId
      office_email: $officeEmail
    ) {
      valid
      message
    }
  }
`

/* validatePersonIdentification Query */
const VALIDATE_PERSON_IDENTIFICATION = gql`
  query($personId: ID, $personIdentification: String!) {
    validation: validatePersonIdentification(
      person_id: $personId
      person_identification: $personIdentification
    ) {
      valid
      message
    }
  }
`

/* validateUserEmail Query */
const VALIDATE_USER_EMAIL = gql`
  query($userId: ID, $userEmail: String!) {
    validation: validateUserEmail(user_id: $userId, email: $userEmail) {
      valid
      message
    }
  }
`

export function getQuery(query) {
  switch (query) {
    case 'validateCompanyIdentification':
      return VALIDATE_COMPANY_IDENTIFICATION
    case 'validateOfficeEmail':
      return VALIDATE_OFFICE_EMAIL
    case 'validatePersonIdentification':
      return VALIDATE_PERSON_IDENTIFICATION
    case 'validateUserEmail':
      return VALIDATE_USER_EMAIL
  }
}

export function setVariables(query, id, value) {
  switch (query) {
    case 'validateCompanyIdentification':
      return {
        companyId: id,
        companyIdentification: value
      }
    case 'validateOfficeEmail':
      return {
        officeId: id,
        officeEmail: value
      }
    case 'validatePersonIdentification':
      return {
        personId: id,
        personIdentification: value
      }
    case 'validateUserEmail':
      return {
        userId: id,
        userEmail: value
      }
  }
}
