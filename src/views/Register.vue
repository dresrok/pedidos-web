<template lang="pug">
  .register
    v-container(grid-list-md)
      v-layout(row, wrap, justify-start)
        company-form-register(
          :loading="loading",
          @onSubmit="handleSubmit"
        )
</template>

<script>
import CompanyFormRegister from '@/components/Company/CompanyFormRegister'

import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyFormRegister
  },
  computed: {
    ...mapGetters({
      loading: 'company/getLoading'
    })
  },
  async created() {
    await this.$store.dispatch('businessType/retrieveData')
  },
  methods: {
    async handleSubmit(payload) {
      await this.$store
        .dispatch('company/registerCompany', {
          payload
        })
        .then(response => {
          this.$router.push({ name: 'mi-restaurante' })
        })
    }
  }
}
</script>
