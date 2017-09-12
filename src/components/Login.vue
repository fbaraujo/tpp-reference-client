<template>
  <div id="login">
    <h1 class="ui aligned header">Login to view balances</h1>
    <div class="ui hidden divider"></div>
    <div class="ui container">
      <button class="ui large primary submit button" @click="handleLogin()">
        Login
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    handleLogin() {
      this.$router.push('accounts');
    },
  },
};
</script>
