<template lang="pug">
  v-dialog(max-width="900px", v-model="dialog", scrollable, persistent)
    v-tooltip(top, slot="activator")
      v-btn(
        flat,
        slot="activator",
        :class="dialogSettings.buttonClass",
        @click.stop="onShowDialog"
      ) 
        v-icon(size="16", :class="dialogSettings.buttonIconClass") {{ dialogSettings.buttonIcon }}
        | {{ dialogSettings.buttonText }}
      span {{ dialogSettings.title }}
    v-form(ref="companyForm", @submit.prevent="onSubmit", enctype="multipart/form-data")
      v-card
        v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text {{ dialogSettings.title }}
        v-card-text
          v-container(grid-list-md)
            v-layout(row, wrap)
              v-flex(d-flex, xs12, sm6)
                v-layout(row, wrap)
                  v-flex(d-flex, xs12)
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
                  v-flex(d-flex, xs12)
                    v-text-field(
                      label="Nombre comercial",
                      prepend-icon="fas fa-pen",
                      v-model="company.company_commercial_name",
                      v-validate="'max:128'",
                      :counter="128",
                      :error-messages="errors.collect('nombre comercial')",
                      data-vv-name="nombre comercial"
                    )
              v-flex(xs12, sm4, offset-sm1)
                v-card(flat, tile, class="d-flex")
                  v-img(
                    height="auto",
                    width="100%",
                    max-height="200px",
                    :src="company.company_image_medium",
                    lazy-src="https://via.placeholder.com/300x200.png",
                    aspect-ratio="1"
                  )
              v-flex(xs12, sm6)
                v-text-field(
                  label="NIT *",
                  prepend-icon="fas fa-pen",
                  v-model="company.company_identification",
                  v-validate="'required|max:12'",
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
                  v-model="place",
                  v-validate="'required|max:128'",
                  :counter="128",
                  :error-messages="errors.collect('ciudad')",
                  data-vv-name="ciudad",
                  required
                )
              v-flex(xs12)
                v-select(
                  label="Tipos de negocio *",
                  :items="businessTypes",
                  item-text="business_type_name",
                  item-value="business_type_id",
                  prepend-icon="fas fa-list-ul",
                  chips,
                  multiple,
                  return-object,
                  menu-props="offsetY",
                  v-model="company.offices[0].business_types",
                  v-validate="'required'",
                  :error-messages="errors.collect('tipos de negocio')",
                  data-vv-name="tipos de negocio",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Email",
                  prepend-icon="fas fa-pen",
                  v-model="company.offices[0].office_email",
                  v-validate="'max:64'",
                  :counter="64",
                  :error-messages="errors.collect('email')",
                  data-vv-name="email",
                )
              v-flex(xs12, sm6)
                v-text-field(
                  label="Abierto desde *",
                  prepend-icon="fas fa-pen",
                  persistent-hint,
                  hint="Ejemplo: 8:00 am",
                  v-model="company.offices[0].office_open_from",
                  v-validate="'required|max:8'",
                  :counter="8",
                  :error-messages="errors.collect('abierto desde')",
                  data-vv-name="abierto desde",
                  required
                )
              v-flex(xs12, sm6)
                v-text-field(
                  label="Abierto hasta *",
                  prepend-icon="fas fa-pen",
                  persistent-hint,
                  hint="Ejemplo: 6:00 pm",
                  v-model="company.offices[0].office_open_to",
                  v-validate="'required|max:8'",
                  :counter="8",
                  :error-messages="errors.collect('abierto hasta')",
                  data-vv-name="abierto hasta",
                  required
                )
              v-flex(xs12, sm6)
                v-text-field(
                  label="Tiempo aproximado de entrega *",
                  prepend-icon="fas fa-pen",
                  persistent-hint,
                  hint="Ejemplo: 30 minutos",
                  v-model="company.offices[0].office_delivery_time	",
                  v-validate="'required|max:16'",
                  :counter="16",
                  :error-messages="errors.collect('Tiempo aproximado de entrega')",
                  data-vv-name="Tiempo aproximado de entrega",
                  required
                )
              v-flex(xs12, sm6)
                v-text-field(
                  label="Precio mínimo del pedido *",
                  prepend-icon="fas fa-pen",
                  type="number",
                  persistent-hint,
                  hint="Ejemplo: 3000",
                  v-model="company.offices[0].office_minimum_order_price	",
                  v-validate="'required'",
                  :error-messages="errors.collect('Precio mínimo del pedido')",
                  data-vv-name="Precio mínimo del pedido",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Imagen",
                  prepend-icon="fas fa-image",
                  v-model="company.company_image",
                  persistent-hint,
                  hint="Archivos .jpeg, .jpg o .png",
                  :error-messages="errors.collect('imagen')",
                  @click="onPickFile"
                )
                input(
                  type="file",
                  accept="image/*",
                  :multiple="false",
                  style="display: none",
                  ref="companyImage",
                  v-validate="'image|ext:jpeg,jpg,png|max_dimensions:1280,960|size:1000'",
                  data-vv-name="imagen",
                  @change="onFileChange"
                )
        v-divider
        v-card-actions
          v-spacer
          v-btn(flat, color="grey", @click="onClose") Cerrar
          v-btn(flat, color="info", type="submit") Guardar
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    selectedCompany: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      dialogSettings: {
        buttonIcon: 'fas fa-pen',
        buttonIconClass: '',
        buttonText: '',
        buttonClass: 'ma-0 v-btn--floating v-btn--small white--text',
        title: 'Editar mi restaurante'
      },
      company: {
        company_id: null,
        company_legal_name: '',
        company_commercial_name: '',
        company_identification: '',
        company_image: '',
        city: '',
        offices: [{}]
      },
      place: JSON.parse(JSON.stringify(this.selectedCompany.city)),
      image: ''
    }
  },
  computed: {
    ...mapGetters({
      businessTypes: 'businessType/getBusinessTypes'
    })
  },
  methods: {
    onShowDialog() {
      this.dialog = true
      if (this.selectedCompany.company_id) {
        this.company = JSON.parse(JSON.stringify(this.selectedCompany))
        //this.place = this.company.city
      }
    },
    onPickFile() {
      this.$refs.companyImage.click()
    },
    onFileChange($event) {
      if ($event.target.files[0]) {
        this.image = $event.target.files[0]
        this.company.company_image = this.image.name
      } else {
        this.company.company_image = ''
      }
    },
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = new FormData()
          payload.append('company_id', this.company.company_id)
          payload.append('company_legal_name', this.company.company_legal_name)
          payload.append(
            'company_commercial_name',
            this.company.company_commercial_name
          )
          payload.append(
            'company_identification',
            this.company.company_identification
          )
          payload.append('company_image', this.image)
          payload.append('city', this.place.name)
          payload.append('office_id', this.company.offices[0].office_id)
          payload.append('office_email', this.company.offices[0].office_email)
          payload.append(
            'office_open_from',
            this.company.offices[0].office_open_from
          )
          payload.append(
            'office_open_to',
            this.company.offices[0].office_open_to
          )
          payload.append(
            'office_delivery_time',
            this.company.offices[0].office_delivery_time
          )
          payload.append(
            'office_minimum_order_price',
            this.company.offices[0].office_minimum_order_price
          )
          payload.append(
            'business_types',
            this.$_.map(
              this.company.offices[0].business_types,
              'business_type_id'
            )
          )
          await this.$emit('onSubmit', payload)
          await this.onClose()
        }
      })
    },
    onClose() {
      this.dialog = false
      this.image = ''
      this.$refs.companyImage.value = ''
      if (!this.company.company_id) {
        this.$refs.companyForm.reset()
        this.$validator.reset()
      } else {
        this.company.company_image = ''
      }
    }
  }
}
</script>
