<template lang="pug">
  v-container.my-4
    v-layout(row, justify-center)
      v-flex(xs12)
        v-form(ref="companyFormRegister", @submit.prevent="onSubmit")
          v-card
            v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text Registrar restaurante
            v-card-text
              v-container(grid-list-md)
                v-layout(row, wrap, align-center)
                  v-flex(xs12)
                    .title Datos de la compañía
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Razón social *",
                      prepend-icon="fas fa-pen",
                      v-model="company.company_legal_name",
                      v-validate="'required|max:128'",
                      :counter="128",
                      :error-messages="errors.collect('razón social')",
                      data-vv-name="razón social",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="NIT *",
                      prepend-icon="fas fa-pen",
                      v-model="company.company_identification",
                      v-validate="{ required: true, max: 12, unique: [company.company_id, 'validateCompanyIdentification'] }",
                      :counter="12",
                      :error-messages="errors.collect('nit')",
                      data-vv-name="nit",
                      required
                    )
                  v-flex(xs12, sm6)
                    vuetify-algolia-places(
                      type="city",
                      language="es",
                      :around-lat-lng-via-ip="false"
                      prepend-icon="fas fa-city",
                      append-icon="fas fa-map-marker-alt",
                      label="Busque una ciudad",
                      clearable,
                      v-model="company.city",
                      v-validate="'required|max:128'",
                      :counter="128",
                      :error-messages="errors.collect('ciudad')",
                      data-vv-name="ciudad",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-select(
                      label="Tipos de negocio *",
                      :items="businessTypes",
                      item-text="business_type_name",
                      item-value="business_type_id",
                      prepend-icon="fas fa-list-ul",
                      deletable-chips,
                      chips,
                      multiple,
                      return-object,
                      menu-props="offsetY",
                      v-model="company.business_types",
                      v-validate="'required'",
                      :error-messages="errors.collect('tipos de negocio')",
                      data-vv-name="tipos de negocio",
                      required
                    )
                  v-flex(xs12)
                    .title Datos del administrador
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Nombres *",
                      prepend-icon="fas fa-pen",
                      v-model="person.person_first_name",
                      v-validate="'required|alpha|max:64'",
                      :counter="64",
                      :error-messages="errors.collect('nombres')",
                      data-vv-name="nombres",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Apellidos *",
                      prepend-icon="fas fa-pen",
                      v-model="person.person_last_name",
                      v-validate="'required|alpha|max:64'",
                      :counter="64",
                      :error-messages="errors.collect('apellidos')",
                      data-vv-name="apellidos",
                      required
                    )
                  v-flex(xs12)
                    v-text-field(
                      label="Identificación *",
                      prepend-icon="fas fa-pen",
                      v-model="person.person_identification",
                      v-validate="{ required: true, numeric: true, max: 11, unique: [person.person_id, 'validatePersonIdentification'] }",
                      :counter="11",
                      :error-messages="errors.collect('identificación')",
                      data-vv-name="identificación",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Email",
                      prepend-icon="fas fa-envelope",
                      ref="email",
                      v-model="user.email",
                      v-validate="{required: true, email: true, max:64, unique: [person.person_id, 'validateUserEmail'] }",
                      :counter="64",
                      :error-messages="errors.collect('email')"
                      data-vv-name="email",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Confirmar email",
                      prepend-icon="fas fa-envelope",
                      v-model="user.confirm_email",
                      v-validate="'required|email|confirmed:email'",
                      :error-messages="errors.collect('confirmar email')"
                      data-vv-name="confirmar email",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Contraseña",
                      prepend-icon="fas fa-lock"
                      ref="password",
                      type="password",
                      v-model="user.password",
                      v-validate="'required|min:8'",
                      :error-messages="errors.collect('contraseña')"
                      data-vv-name="contraseña",
                      required
                    )
                  v-flex(xs12, sm6)
                    v-text-field(
                      label="Confirmar contraseña",
                      prepend-icon="fas fa-lock"
                      type="password",
                      v-model="user.confirm_password",
                      v-validate="'required|min:8|confirmed:password'",
                      :error-messages="errors.collect('confirmar contraseña')"
                      data-vv-name="confirmar contraseña",
                      required
                    )
              v-divider
              v-card-actions
                v-spacer
                v-btn(flat, color="grey", router, to="/") Iniciar sesión
                v-btn(flat, color="info", type="submit", :loading="loading") Registrar
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      company: {
        company_legal_name: '',
        company_identification: '',
        city: '',
        business_types: []
      },
      person: {
        person_first_name: '',
        person_last_name: '',
        person_identification: ''
      },
      user: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      businessTypes: 'businessType/getBusinessTypes'
    })
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = {}
          payload.company_legal_name = this.company.company_legal_name
          payload.company_identification = this.company.company_identification
          payload.city = this.company.city.name
          payload.business_types = this.$_.map(
            this.company.business_types,
            'business_type_id'
          )
          payload.person_first_name = this.person.person_first_name
          payload.person_last_name = this.person.person_last_name
          payload.person_identification = this.person.person_identification
          payload.email = this.user.email
          payload.password = this.user.password
          await this.$emit('onSubmit', payload)
          this.clearForm()
        }
      })
    },
    clearForm() {
      this.$refs.companyFormRegister.reset()
      this.$validator.reset()
    }
  }
}
</script>
