<template lang="pug">
  .company.my-4
    h1.title.grey--text.text--lighten-1 Mi restaurante
    v-container(grid-list-md)
      v-layout.mb-3(row, wrap, justify-start)
        company-card(:company="company")
        user-card(:user="user")
</template>

<script>
import CompanyCard from '@/components/Company/CompanyCard'
import UserCard from '@/components/User/UserCard'

import { mapGetters } from 'vuex'

export default {
  components: {
    CompanyCard,
    UserCard
  },
  computed: {
    ...mapGetters({
      company: 'company/getCompany',
      user: 'user/getUser'
    })
  }
}
</script>
