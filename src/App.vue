<template lang="pug">
  v-app
    the-navbar
    v-content.mx-4.mb-4.mt-5
      transition(name="fade")
        router-view
    the-footer
</template>

<script>
import TheNavbar from '@/components/Partials/TheNavbar'
import TheFooter from '@/components/Partials/TheFooter'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter
  },
  data() {
    return {
      //
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn'
    })
  }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateX(-25px);
}
</style>
