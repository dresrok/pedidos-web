<template lang="pug">
  v-toolbar(app, flat)
    v-toolbar-side-icon.grey--text(v-show="isAuthenticated", @click="onToggleDrawer")
      v-icon(size="20") fas fa-bars
    v-toolbar-title.grey--text
      router-link(to="/", tag="span", style="cursor: pointer")
        span.font-weight-light Pedidos
        span Web
    v-spacer
    v-toolbar-items
    v-menu(v-if="isAuthenticated", offset-y, :nudge-width="200")
      v-btn.grey--text(icon, slot="activator")
        v-icon(size="20") fas fa-chevron-circle-down
      v-card
        v-list
          v-list-tile(avatar)
            v-list-tile-avatar
              v-icon.grey--text(size="20") fas fa-user-circle
            v-list-tile-content
              v-list-tile-title {{ userFullName }}
              v-list-tile-sub-title {{ userProfileName }}
        v-divider
        v-list(dense)
          v-list-tile(router, :to="{ name: 'logout' }", avatar)
            v-list-tile-avatar
              v-icon.grey--text(size="20") fas fa-sign-out-alt
            v-list-tile-content.grey--text
              v-list-tile-title.text-lg-left Cerrar sesión
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
    },
    userProfileName: {
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
