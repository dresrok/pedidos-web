<template lang="pug">
  .categories.my-4
    h1.title.grey--text.text--lighten-1 Categorías
    v-container(grid-list-md)
      v-layout.mb-3(row, wrap, justify-start)
        category-form(
          :loading="loading"
          @onSubmit="handleSubmit"
        )
        category-search-form(
          @onSearch="handleSearch"
        )
        category-list(
          :loading="loading",
          :officeId="officeId",
          @onSubmit="handleSubmit"
        )
</template>

<script>
import CategorySearchForm from '@/components/Category/CategorySearchForm'
import CategoryForm from '@/components/Category/CategoryForm'
import CategoryList from '@/components/Category/CategoryList'

import { mapGetters } from 'vuex'

export default {
  components: {
    CategorySearchForm,
    CategoryForm,
    CategoryList
  },
  computed: {
    ...mapGetters({
      loading: 'category/getLoading',
      userId: 'user/getUserId',
      officeId: 'company/getOfficeId'
    })
  },
  async created() {
    await this.$store.dispatch('category/retrieveData', {
      officeId: this.officeId
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
    },
    async handleSearch(payload) {
      await this.$store.dispatch('category/retrieveData', {
        officeId: this.officeId,
        categoryName: payload.categoryName
      })
    }
  }
}
</script>
