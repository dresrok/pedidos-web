<template lang="pug">
  v-flex(xs12)
    v-data-table(
      :headers="headers",
      :items="paginatedProducts",
      :pagination.sync="pagination",
      :total-items="paginationInfo.totalItems",
      :rows-per-page-items="paginationInfo.rowsPerPageItems",
      :loading="pending",
      no-data="No hay productos disponibles",
      class="elevation-1"
    )
      template(slot="items", slot-scope="props")
        td {{ props.item.category.category_name }}
        td
          v-avatar(
            :size="36",
            color="grey lighten-4"
          )
            v-img(
              height="auto",
              width="100%",
              max-height="36px",
              :src="props.item.product_image_mini",
              lazy-src="https://via.placeholder.com/30x30.png?text=P",
              aspect-ratio="1",
              contain
            )
          span.ml-2 {{ props.item.product_name }}
        td {{ props.item.prices[0].product_price_amount }}
        td
          product-form(
            :loading="loading",
            :selectedProduct="props.item",
            @onSubmit="handleSubmit"
          )
          product-prices(
            :selectedProduct="props.item"
          )
</template>

<script>
import ProductForm from '@/components/Product/ProductForm'
import ProductPrices from '@/components/Product/ProductPrices'

import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  components: {
    ProductForm,
    ProductPrices
  },
  data() {
    return {
      headers: [
        { text: 'Categoría', value: 'category_name', sortable: false },
        { text: 'Producto', value: 'product_name', sortable: false },
        { text: 'Precio', value: 'product_orice', sortable: false },
        { text: 'Acciones', value: 'product_actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      pending: 'product/getPending',
      paginatedProducts: 'product/getPaginatedProducts',
      paginationInfo: 'product/getPagination',
      officeId: 'company/getOfficeId'
    }),
    pagination: {
      get() {
        return this.paginationInfo
      },
      set(payload) {
        if (this.officeId && this.paginatedProducts.length > 0) {
          this.$store.commit('product/SET_PAGINATION', payload)
          this.$store.dispatch('product/paginateProducts', {
            officeId: this.officeId
          })
        }
      }
    }
  },
  methods: {
    handleSubmit(payload) {
      this.$emit('onSubmit', payload)
    }
  }
}
</script>
