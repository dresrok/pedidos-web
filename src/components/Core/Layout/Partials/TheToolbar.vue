<template lang="pug">
  v-toolbar(app, flat)
    v-toolbar-side-icon.grey--text(v-show="isAuthenticated", @click="onToggleDrawer")
      v-icon(size="20") fas fa-bars
    v-toolbar-title.grey--text
      router-link( to="/" tag="span" style="cursor: pointer")
        span.font-weight-light Pedidos
        span Web
    v-spacer
    v-toolbar-items
    v-menu(v-if="isAuthenticated", bottom, left, offset-y)
      v-btn.grey--text(icon, slot="activator")
        v-icon(size="20") fas fa-chevron-circle-down
      v-list(dense)
        v-subheader {{ userFullName }}
        v-list-tile(router :to="{ name: 'logout' }")
          v-list-tile-content.grey--text
            v-list-tile-title.text-lg-right Cerrar sesión
          v-list-tile-action
            v-icon.grey--text(size="20") fas fa-sign-out-alt
</template>

<script>
export default {
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    },
    drawer: {
      type: Boolean,
      required: true
    },
    userFullName: {
      type: String,
      required: true
    }
  },
  methods: {
    onToggleDrawer() {
      this.$emit('onToggleDrawer', !this.drawer)
    }
  }
}
</script>
