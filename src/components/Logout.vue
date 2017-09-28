<template>
  <button v-if="isLoggedIn" name="logout" class="ui large primary submit button" @click="logout()">
    Logout
  </button>
</template>

<script>
export default {
  name: 'logout',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn();
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('deleteSession').then(() => {
        this.$router.push({ path: '/' });
      });
    },
  },
};
</script>

<style scoped>
button {
  width: 390px;
}
</style>
