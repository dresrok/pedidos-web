<template lang="pug">
  .topics.my-4
    h1.title.blue-grey--text.text--lighten-2 Categorías
    v-container
      v-layout.mb-3(row, wrap, justify-start)
        category-form(
          :loading="loading"
          @onSubmit="handleSubmit"
        )
        category-list(
          :loading="loading",
          :officeId="officeId",
          @onSubmit="handleSubmit"
        )
</template>

<script>
import CategoryForm from '@/components/Category/CategoryForm'
import CategoryList from '@/components/Category/CategoryList'

import { mapGetters } from 'vuex'

export default {
  components: {
    CategoryForm,
    CategoryList
  },
  computed: {
    ...mapGetters({
      loading: 'category/getLoading',
      officeId: 'company/getOfficeId'
    })
  },
  async created() {
    await this.$store.dispatch('user/retrieveData')
    await this.$store.dispatch('company/retrieveData', {
      userId: this.$store.state.user.user.user_id
    })
    await this.$store.dispatch('category/retrieveData', {
      officeId: this.$store.state.company.company.offices[0].office_id
    })
  },
  methods: {
    async handleSubmit(payload) {
      if (payload.get('category_id') === 'undefined') {
        await this.$store.dispatch('category/createCategory', {
          payload
        })
      } else {
        await this.$store.dispatch('category/updateCategory', {
          payload
        })
      }
    }
  }
}
</script>
