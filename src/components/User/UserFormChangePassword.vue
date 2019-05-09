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
                  label="Contraseña actual",
                  prepend-icon="fas fa-lock",
                  ref="current_password",
                  type="password",
                  v-model="user.current_password",
                  v-validate="'required|min:8'",
                  :error-messages="errors.collect('contraseña actual')",
                  data-vv-name="contraseña actual",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Nueva contraseña",
                  prepend-icon="fas fa-lock",
                  ref="new_password",
                  type="password",
                  v-model="user.new_password",
                  v-validate="{ required: true, is_not: user.current_password, min:8 }",
                  :error-messages="errors.collect('nueva contraseña')",
                  data-vv-name="nueva contraseña",
                  required
                )
              v-flex(xs12)
                v-text-field(
                  label="Confirmar contraseña",
                  prepend-icon="fas fa-lock",
                  type="password",
                  v-model="user.confirm_password",
                  v-validate="'required|min:8|confirmed:new_password'",
                  :error-messages="errors.collect('confirmar contraseña')",
                  data-vv-name="confirmar contraseña",
                  required
                )
        v-divider
        v-card-actions
          v-spacer
          v-btn(flat, color="grey", @click="onClose") Cerrar
          v-btn(flat, color="info", type="submit") Cambiar
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogSettings: {
        buttonIcon: 'fas fa-lock',
        buttonIconClass: '',
        buttonText: '',
        buttonClass: 'ma-0 v-btn--floating v-btn--small white--text',
        title: 'Cambiar contraseña'
      },
      user: {
        current_password: '',
        new_password: '',
        confirm_password: ''
      }
    }
  },
  methods: {
    onShowDialog() {
      this.dialog = true
    },
    onSubmit() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          const payload = {}
          payload.current_password = this.user.current_password
          payload.new_password = this.user.new_password

          await this.$emit('onChangePassword', payload)
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
