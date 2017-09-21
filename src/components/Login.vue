<template>
  <div id="login">
    <h1 class="ui aligned header">Login to view balances</h1>
    <div class="ui hidden divider"></div>
    <div class="ui container">
      <form class="ui form" @submit.prevent="login({ username, password })">
        <div class="field">
          <label for="username">Username</label>
          <input name="u" type="text" placeholder="username" v-model="username">
        </div>
        <div class="field">
          <label for="password">Password</label>
          <input name="p" type="password" placeholder="password" v-model="password">
        </div>
        <button name="login" class="ui large primary submit button">
        Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: 'alice',
      password: 'wonderland',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('createSession', {
        u: this.username,
        p: this.password,
      }).then(() => {
        this.$router.push('accounts');
      });
    },
  },
};
</script>

<style scoped>
.form {
  width: 390px;
}
</style>
