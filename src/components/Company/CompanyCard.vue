<template lang="pug">
  v-flex(xs12, sm6)
    v-card(flat)
      v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text Mi restaurante
        v-spacer
        company-form(
          :selectedCompany="company"
          @onSubmit="handleSubmit"
        )
      v-card-text
        v-layout(row, wrap)
          v-flex(xs12, sm6)
            .caption.grey--text Razón social
            div.mb-2 {{ company.company_legal_name }}
            .caption.grey--text Nombre comercial
            div.mb-2 {{ company.company_comercial_name || 'No registra' }}
            .caption.grey--text NIT
            div.mb-2 {{ company.company_identification}}
            .caption.grey--text Ciudad
            div.mb-2 {{ company.city }}
            .caption.grey--text Email
            div.mb-2 {{ company.offices[0].office_email || 'Por definir' }}
          v-flex(xs12, sm6)
            .caption.grey--text Abierto desde
            div.mb-2 {{ company.offices[0].office_open_from || 'Por definir' }}
            .caption.grey--text Abierto hasta
            div.mb-2 {{ company.offices[0].office_open_to || 'Por definir' }}
            .caption.grey--text Tiempo aproximado de entrega
            div.mb-2 {{ company.offices[0].office_delivery_time || 'Por definir' }}
            .caption.grey--text Precio mínimo del pedido
            div.mb-2 {{ company.offices[0].office_minimum_order_price || 'Por definir' }}
            .caption.grey--text Tipos de negocio
            div.mb-2
              span(
                v-for="(business_type, i) in company.offices[0].business_types"
                :key="business_type.business_type_id"
              ) {{ business_type.business_type_name }}{{ (i+1) < company.offices[0].business_types.length ? ', ' : '' }}
</template>

<script>
import CompanyForm from '@/components/Company/CompanyForm'

export default {
  components: {
    CompanyForm
  },
  props: {
    company: {
      type: Object,
      required: true
    }
  },
  async created() {
    await this.$store.dispatch('businessType/retrieveData')
  },
  methods: {
    async handleSubmit(payload) {
      await this.$store.dispatch('company/updateCompany', {
        payload
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
