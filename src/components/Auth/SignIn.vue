<template lang="pug">
  v-container.my-5
    v-layout.mb-3(row, justify-center)
      v-flex(xs12, sm6, md6)
        v-form(ref="form", @submit.prevent="onSubmit")
          v-card
            v-card-title.headline.blue.lighten-2 Iniciar sesión
            v-card-text
                v-text-field(label="Email", v-model="email", prepend-icon="fas fa-envelope")
                v-text-field(label="Contraseña", type="password", v-model="password", prepend-icon="fas fa-lock")
            v-divider
            v-card-actions
              v-spacer
              v-btn(flat, color="blue", type="submit") Acceder
</template>

<script>
export default {
  data() {
    return {
      client_name: 'web',
      email: '',
      password: '',
      serverError: ''
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
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
    }
  }
}
</script>
