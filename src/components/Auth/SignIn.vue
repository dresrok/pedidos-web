<template lang="pug">
  v-container.my-5
    v-layout.mb-3(row, justify-center)
      v-flex(xs12, sm6, md6)
        v-form(ref="form", @submit.prevent="onSubmit")
          v-card
            v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text Iniciar sesión
            v-card-text
                v-text-field(
                  label="Email",
                  prepend-icon="fas fa-envelope",
                  v-model="email",
                  v-validate="'required|email'",
                  :error-messages="errors.collect('email')"
                  data-vv-name="email",
                  required
                )
                v-text-field(
                  label="Contraseña",
                  prepend-icon="fas fa-lock"
                  type="password",
                  v-model="password",
                  v-validate="'required'",
                  :error-messages="errors.collect('contraseña')"
                  data-vv-name="contraseña",
                  required
                )
            v-divider
            v-card-actions
              v-spacer
              v-btn(flat, color="info", type="submit", :loading="loading") Acceder
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      client_name: 'web',
      email: '',
      password: '',
      serverError: ''
    }
  },
  computed: {
    ...mapGetters({
      loading: 'auth/getLoading'
    })
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$store
            .dispatch('auth/signIn', {
              username: this.email,
              password: this.password,
              client_name: this.client_name
            })
            .then(response => {
              this.$router.push({ name: 'dashboard' })
            })
        }
      })
    }
  }
}
</script>
