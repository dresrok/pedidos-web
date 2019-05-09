<template lang="pug">
  v-flex(xs12, sm6)
    v-card(flat)
      v-card-title.title.deep-purple.lighten-1.font-weight-regular.white--text Mi usuario
        v-spacer
        user-form(
          :selectedPerson="user.person"
          @onSubmit="handleSubmit"
        )
        user-form-change-password(
          @onChangePassword="handleChangePassword"
        )
      v-card-text
        v-layout(row, wrap)
          v-flex(xs12, sm6)
            .caption.grey--text Perfil
            div.mb-2 {{ user.profile.profile_name }}
            .caption.grey--text Nombres
            div.mb-2 {{ user.person.person_first_name}}
            .caption.grey--text Apellidos
            div.mb-2 {{ user.person.person_last_name }}
            .caption.grey--text Identificación
            div.mb-2 {{ user.person.person_identification }}
            .caption.grey--text Email
            div.mb-2 {{ user.email }}
</template>

<script>
import UserForm from '@/components/User/UserForm'
import UserFormChangePassword from '@/components/User/UserFormChangePassword'

export default {
  components: {
    UserForm,
    UserFormChangePassword
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  methods: {
    async handleSubmit(payload) {
      await this.$store.dispatch('user/updatePerson', {
        payload
      })
    },
    async handleChangePassword(payload) {
      await this.$store.dispatch('user/changePassword', {
        payload
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
