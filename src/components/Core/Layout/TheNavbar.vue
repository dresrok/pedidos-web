<template lang="pug">
  nav
    the-toolbar(
      :isAuthenticated="isAuthenticated",
      :drawer="drawer",
      :userFullName="userFullName",
      @onToggleDrawer="handleToggleDrawer"
    )
    the-navigation-drawer(
      v-show="isAuthenticated",
      :drawer="drawer",
      :userFullName="userFullName",
      :userProfileName="userProfileName",
      :menus="menus"
      @onToggleDrawer="handleToggleDrawer"
    )
</template>

<script>
import TheToolbar from '@/components/Core/Layout/Partials/TheToolbar'
import TheNavigationDrawer from '@/components/Core/Layout/Partials/TheNavigationDrawer'

import { mapGetters } from 'vuex'

export default {
  components: {
    TheToolbar,
    TheNavigationDrawer
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/getIsAuthenticated',
      drawer: 'layout/getDrawer',
      userFullName: 'user/getFullName',
      userProfileName: 'user/getProfileName',
      menus: 'user/getMenus'
    })
  },
  methods: {
    handleToggleDrawer(payload) {
      this.$store.dispatch('layout/toggleDrawer', payload)
    }
  }
}
</script>
