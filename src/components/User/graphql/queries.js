import gql from 'graphql-tag'

/* Me Query */
export const ME = gql`
  query {
    me {
      user_id
      email
      person {
        person_id
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
  }
`
