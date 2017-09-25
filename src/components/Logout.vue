<template>
  <button name="logout" class="ui large primary submit button" @click="logout()">
    Logout
  </button>
</template>

<script>
export default {
  name: 'logout',
  methods: {
    logout() {
      this.$store.dispatch('deleteSession').then(() => {
        this.$router.push({ path: '/' });
      });
    },
  },
};
</script>
