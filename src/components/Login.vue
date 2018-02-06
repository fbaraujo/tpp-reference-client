<template>
  <div id="login" class="ui container">
    <div class="ui hidden divider"></div>
    <div class="ui error message" v-if="invalidCredentials">
      <div class="header">Invalid username or password</div>
      <p>Try again with different username and/or password.</p>
    </div>
    <div class="ui error message" v-if="loginError">
      <div class="header">We are having issues with our login system</div>
      <p>Try again later.</p>
    </div>
    <div class="xs-mb5">
      <form class="" @submit.prevent="login({ username, password })">
        <div class="field">
          <!--<label for="username">Username</label>-->
          <input class="text-gray-lightest xs-my2" name="u" type="text" placeholder="username" v-model="username">
        </div>
        <div class="field">
          <!--<label for="password">Password</label>-->
          <input name="p" type="password" placeholder="password" v-model="password">
        </div>
        <button name="login" class="ui large primary submit button xs-my3">
        Login
        </button>
      </form>
    </div>
    <p class="text-pink">Forgot your password?</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      username: 'alice',
      password: 'wonderland',
    };
  },
  computed: {
    ...mapGetters(['invalidCredentials', 'isLoggedIn', 'loginError']),
  },
  methods: {
    async login() {
      await this.$store.dispatch('createSession', {
        u: this.username,
        p: this.password,
      });
      if (this.isLoggedIn) {
        this.$router.push('/activity-selection');
      }
    },
  },
};
</script>

<style scoped>
/*.form, .error, button {
  width: 390px;
}*/
</style>
