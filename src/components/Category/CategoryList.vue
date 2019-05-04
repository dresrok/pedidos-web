<template lang="pug">
  v-flex(xs12)
    v-data-table(
      :headers="headers"
      :items="categories"
      :pagination.sync="pagination"
      :total-items="paginationInfo.totalItems"
      :rows-per-page-items="paginationInfo.rowsPerPageItems"
      :loading="pending"
      no-data="No hay categorías disponibles"
      class="elevation-1"
    )
      template(slot="items", slot-scope="props")
        td()
          v-avatar(
            :size="36",
            color="grey lighten-4"
          )
            v-img(
              height="auto",
              width="100%",
              max-height="34px"
              :src="props.item.category_image_mini",
              lazy-src="https://via.placeholder.com/30x30.png?text=C",
              aspect-ratio="1",
              contain
            )
          span.ml-2 {{ props.item.category_name }}
        td
          category-form(
            :loading="loading"
            :selectedCategory="props.item"
            @onSubmit="handleSubmit"
          )
</template>

<script>
import CategoryForm from '@/components/Category/CategoryForm'

import { mapGetters } from 'vuex'

export default {
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  },
  components: {
    CategoryForm
  },
  data() {
    return {
      headers: [
        { text: 'Nombre', value: 'category_name', sortable: false },
        { text: 'Acciones', value: 'category_actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      pending: 'category/getPending',
      categories: 'category/getCategories',
      paginationInfo: 'category/getPagination',
      officeId: 'company/getOfficeId'
    }),
    pagination: {
      get() {
        return this.paginationInfo
      },
      set(payload) {
        if (this.officeId && this.categories.length > 0) {
          this.$store.commit('category/SET_PAGINATION', payload)
          this.$store.dispatch('category/retrieveData', {
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
