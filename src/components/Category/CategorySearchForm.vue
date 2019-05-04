<template lang="pug">
  v-flex(xs12)
    v-form(ref="categorySearchForm", @submit.prevent="onSearch")
      v-card
        v-card-text.pa-0
          v-container(grid-list-md)
            v-layout(row, wrap, align-center)
              v-flex(xs6)
                v-text-field(
                  label="Nombre *",
                  prepend-icon="fas fa-pen",
                  v-model="category.category_name"
                  v-validate="'required|max:64'",
                  :counter="64"
                  :error-messages="errors.collect('nombre')"
                  data-vv-name="nombre",
                  required
                )
              v-flex(xs6)
                v-btn.white--text(depressed, small, color="grey", @click="onClear") Limpiar
                v-btn(depressed, small, color="info", type="submit") Buscar
</template>
<script>
export default {
  data() {
    return {
      category: {
        category_name: ''
      }
    }
  },
  methods: {
    onSearch() {
      this.$validator.validate().then(async valid => {
        if (valid) {
          this.$emit('onSearch', {
            categoryName: `%${this.category.category_name}%`
          })
        }
      })
    },
    onClear() {
      this.$refs.categorySearchForm.reset()
      this.$validator.reset()
      this.$emit('onSearch', this.category)
    }
  }
}
</script>
