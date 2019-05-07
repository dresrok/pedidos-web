<template lang="pug">
  .company.my-4
    h1.title.grey--text.text--lighten-1 Mi restaurante
    v-container(grid-list-md)
      v-layout.mb-3(row, wrap, justify-start)
        company-card(:company="company")
</template>

<script>
import CompanyCard from '@/components/Company/CompanyCard'

import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyCard
  },
  computed: {
    ...mapGetters({
      company: 'company/getCompany'
    })
  }
}
</script>
