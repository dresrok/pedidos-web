<template lang="pug">
  v-snackbar(
    v-model="snackbar.show",
    :bottom="snackbar.y === 'bottom'",
    :left="snackbar.x === 'left'",
    :multi-line="snackbar.mode === 'multi-line'",
    :right="snackbar.x === 'right'",
    :timeout="snackbar.timeout",
    :top="snackbar.y === 'top'",
    :vertical="snackbar.mode === 'vertical'",
    :color="snackbar.color"
  )
    span {{ snackbar.text }}
    v-btn(flat, color="white", @click="setSnackbar") Cerrar
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      snackbar: 'layout/getSnackbar'
    })
  },
  methods: {
    setSnackbar() {
      this.$store.dispatch('layout/setSnackbar', {
        show: false
      })
    }
  }
}
</script>
