<template lang="pug">
  nav
    <!-- Horizontal Navbar -->
    v-toolbar(fixed, color="primary", dark)
      <!-- App Title -->
      v-toolbar-side-icon
      v-toolbar-title.hidden-xs-only
        router-link( to="/" tag="span" style="cursor: pointer")
          span Pedidos Web

      v-spacer
      v-toolbar-items   
      v-menu( bottom, left, offset-y)
        v-btn(dark, icon, slot="activator")
          v-icon(class="fas fa-chevron-circle-down")
        v-list(dense)
          v-subheader Beto
          v-list-tile(router :to="{ name: 'logout' }")
            v-list-tile-content
              v-list-tile-title.text-lg-right Cerrar sesión
            v-list-tile-action
              v-icon(class = "fas fa-sign-out-alt", color="white")
</template>
