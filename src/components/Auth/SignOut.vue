<template lang="pug">

</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/destroyToken').then(response => {
      //this.$store.dispatch('user/resetState')
      //this.$store.dispatch('topics/resetState')
      //this.$store.dispatch('layout/resetState')
      this.$router.push({ name: 'home' })
    })
  }
}
</script>
