<template lang="pug">
  .topics.my-4
    h1.title.blue-grey--text.text--lighten-2 Categorías
    v-container
      v-layout.mb-3(row, wrap, justify-start)
        v-btn(
          depressed,
          color="primary",
          @click.stop="dialog = true"
        ) Crear categoría
        category-form(
          :dialog="dialog"
          :loading="loading"
          @onSubmit="handleSubmit"
          @onClose="handleClose"
          )
</template>

<script>
import CategoryForm from '@/components/Category/CategoryForm'

import { mapGetters } from 'vuex'

export default {
  components: {
    CategoryForm
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      loading: 'category/getLoading'
    })
  },
  async created() {
    await this.$store.dispatch('user/retrieveData')
    await this.$store.dispatch('company/retrieveData', {
      userId: this.$store.state.user.user.user_id
    })
  },
  methods: {
    async handleSubmit(payload) {
      await this.$store.dispatch('category/createCategory', {
        payload
      })
    },
    async handleClose() {
      this.dialog = false
    }
  }
}
</script>
