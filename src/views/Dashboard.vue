<template lang="pug">
  v-container
    h1.title.blue-dark--text.text--lighten-2 Welcome to the Jungle 
</template>

<script>
export default {
  name: 'Dashboard',
  async created() {
    await this.$store.dispatch('user/retrieveData')
    await this.$store.dispatch('company/retrieveData', {
      userId: this.$store.state.user.user.user_id
    })
  }
}
</script>
