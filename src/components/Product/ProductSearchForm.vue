<template lang="pug">
  v-flex(xs12)
    v-form(ref="productSearchForm", @submit.prevent="onSearch")
      v-card
        v-card-text.pa-0
          v-container(grid-list-md)
            v-layout(row, wrap, align-center)
              v-flex(xs4)
                v-select(
                  label="Categoría",
                  prepend-icon="fas fa-stream",
                  menu-props="offsetY",
                  :items="categoryList",
                  item-text="category_name",
                  item-value="category_id",
                  v-model="product.category_id"
                )
              v-flex(xs4)
                v-text-field(
                  label="Nombre",
                  prepend-icon="fas fa-pen",
                  v-model="product.product_name",
                  v-validate="'max:64'",
                  :counter="64",
                  :error-messages="errors.collect('nombre')",
                  data-vv-name="nombre"
                )
              v-flex(xs4)
                v-btn.white--text(depressed, small, color="grey", @click="onClear") Limpiar
                v-btn(depressed, small, color="info", type="submit" :disabled="disabled") Buscar
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      product: {
        category_id: null,
        product_name: ''
      }
    }
  },
  computed: {
    disabled() {
      if (this.product.category_id || this.product.product_name) {
        return false
      }
      return true
    },
    ...mapGetters({
      categoryList: 'category/getCategoryList'
    })
  },
  methods: {
    onSearch() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          this.$emit('onSearch', {
            categoryId: this.product.category_id
              ? this.product.category_id
              : undefined,
            productName: this.product.product_name
              ? `%${this.product.product_name}%`
              : undefined
          })
        }
      })
    },
    onClear() {
      this.$refs.productSearchForm.reset()
      this.$validator.reset()
      this.$emit('onSearch', this.product)
    }
  }
}
</script>
