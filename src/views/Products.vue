<template lang="pug">
  .products.my-4
    h1.title.grey--text.text--lighten-1 Productos
    v-container(grid-list-md)
      v-layout.mb-3(row, wrap, justify-start)
        product-form(
          :loading="loading"
          @onSubmit="handleSubmit"
        )
        product-search-form(
          @onSearch="handleSearch"
        )
        product-list(
          :loading="loading",
          :officeId="officeId",
          @onSubmit="handleSubmit"
        )
</template>

<script>
import ProductForm from '@/components/Product/ProductForm'
import ProductSearchForm from '@/components/Product/ProductSearchForm'
import ProductList from '@/components/Product/ProductList'

import { mapGetters } from 'vuex'

export default {
  components: {
    ProductForm,
    ProductSearchForm,
    ProductList
  },
  computed: {
    ...mapGetters({
      loading: 'category/getLoading',
      userId: 'user/getUserId',
      officeId: 'company/getOfficeId'
    })
  },
  async created() {
    await this.$store.dispatch('category/retrieveCategories', {
      officeId: this.officeId
    })
    await this.$store.dispatch('product/paginateProducts', {
      officeId: this.officeId
    })
  },
  methods: {
    async handleSubmit(payload) {
      if (payload.get('product_id') === 'undefined') {
        await this.$store.dispatch('product/createProduct', {
          payload
        })
      } else {
        await this.$store.dispatch('product/updateProduct', {
          payload
        })
      }
    },
    async handleSearch(payload) {
      await this.$store.dispatch('product/paginateProducts', {
        officeId: this.officeId,
        categoryId: payload.categoryId,
        productName: payload.productName
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
