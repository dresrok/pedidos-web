<template lang="pug">

</template>

<script>
export default {
  async created() {
    await this.$store.dispatch('auth/signOut').then(response => {
      this.$router.push({ name: 'home' })
    })
  }
}
</script>
