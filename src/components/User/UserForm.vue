<template lang="pug">
  v-dialog(max-width="600px", v-model="dialog", scrollable, persistent)
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
    v-form(ref="userForm", @submit.prevent="onSubmit")
      v-card
        v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text {{ dialogSettings.title }}
        v-card-text
          v-container(grid-list-md)
            v-layout(row, wrap)
              v-flex(xs12)
                v-text-field(
                  label="Nombres *",
                  prepend-icon="fas fa-pen",
                  v-model="person.person_first_name",
                  v-validate="'required|max:64'",
                  :counter="64",
                  :error-messages="errors.collect('nombres')",
                  data-vv-name="nombres",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Apellidos *",
                  prepend-icon="fas fa-pen",
                  v-model="person.person_last_name",
                  v-validate="'required|max:64'",
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
                  v-validate="{ required: true, max: 11, unique: [person.person_id, 'validatePersonIdentification'] }",
                  :counter="11",
                  :error-messages="errors.collect('identificación')",
                  data-vv-name="identificación",
                  required
                )
        v-divider
        v-card-actions
          v-spacer
          v-btn(flat, color="grey", @click="onClose") Cerrar
          v-btn(flat, color="info", type="submit") Guardar
</template>

<script>
export default {
  props: {
    selectedPerson: {
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
        title: 'Editar mi usuario'
      },
      person: {
        person_id: null,
        person_first_name: '',
        person_last_name: '',
        person_identification: ''
      }
    }
  },
  methods: {
    onShowDialog() {
      this.dialog = true
      if (this.selectedPerson.person_id) {
        this.person = JSON.parse(JSON.stringify(this.selectedPerson))
      }
    },
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = {}
          payload.person_id = this.person.person_id
          payload.person_first_name = this.person.person_first_name
          payload.person_last_name = this.person.person_last_name
          payload.person_identification = this.person.person_identification

          await this.$emit('onSubmit', payload)
          await this.onClose()
        }
      })
    },
    onClose() {
      this.dialog = false
      this.$refs.userForm.reset()
      this.$validator.reset()
    }
  }
}
</script>
