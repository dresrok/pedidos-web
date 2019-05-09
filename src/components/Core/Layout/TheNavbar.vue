<template lang="pug">
  nav
    the-toolbar(
      :isAuthenticated="isAuthenticated",
      :drawer="drawer",
      :userFullName="userFullName",
      :userProfileName="userProfileName",
      @onToggleDrawer="handleToggleDrawer"
    )
    the-navigation-drawer(
      v-if="isAuthenticated",
      :drawer="drawer",
      :company="company",
      :menus="menus",
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
      userFullName: 'user/getUserFullName',
      userProfileName: 'user/getUserProfileName',
      company: 'company/getCompany',
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
