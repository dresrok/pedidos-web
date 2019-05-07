import { apolloClient } from '@/plugins/vue-apollo'

import { UPDATE_COMPANY } from '@/components/Company/graphql/mutations'
import { COMPANY_BY_USER_ID } from '@/components/Company/graphql/queries'

const companyService = {}

companyService.retrieveData = (context, payload) => {
  if (!context.state.company) {
    return apolloClient
      .query({
        query: COMPANY_BY_USER_ID,
        variables: {
          userId: payload.userId
        }
      })
      .then(({ data: { company } }) => {
        context.commit('SET_COMPANY', company)
        return company
      })
      .catch(error => {
        console.error(error)
        return error
      })
  }
}

companyService.updateCompany = (context, { payload }) => {
  return apolloClient
    .mutate({
      mutation: UPDATE_COMPANY,
      variables: {
        companyId: payload.get('company_id'),
        companyLegalName: payload.get('company_legal_name'),
        companyCommercialName:
          payload.get('company_commercial_name') === 'null'
            ? null
            : payload.get('company_commercial_name'),
        companyIdentification: payload.get('company_identification'),
        companyImage: payload.get('company_image'),
        city: payload.get('city'),
        officeId: payload.get('office_id'),
        officeEmail:
          payload.get('office_email') === 'null'
            ? null
            : payload.get('office_email'),
        officeOpenFrom: payload.get('office_open_from'),
        officeOpenTo: payload.get('office_open_to'),
        officeDeliveryTime: payload.get('office_delivery_time'),
        officeMinimumOrderPrice: payload.get('office_minimum_order_price'),
        businessTypes: payload.get('business_types').split(',')
      }
    })
    .then(({ data: { company } }) => {
      context.commit('SET_COMPANY', company)
      context.dispatch(
        'layout/setSnackbar',
        {
          show: true,
          y: 'bottom',
          x: 'right',
          timeout: 5000,
          color: 'info',
          text: 'Se ha actualizado con éxito el restaurante!'
        },
        { root: true }
      )
      return company
    })
    .catch(error => {
      console.error(error)
      return error
    })
}

export default companyService
