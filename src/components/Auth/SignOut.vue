<template lang="pug">

</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/signOut').then(response => {
      this.$router.push({ name: 'home' })
    })
  }
}
</script>
