<template>
  <div id="accounts">
    <h1 class="ui aligned header">Accounts</h1>
    <div class="ui container">
      <div class="ui cards">
        <account v-for="account in accounts"
          v-bind:key="account.AccoundId"
          v-bind:account="account"
          v-bind:aspsp="aspsp">
        </account>
      </div>
      <div class="ui hidden divider"></div>
      <button class="ui large primary submit button" @click="handleLogout()">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import Account from './Account';

export default {
  name: 'accounts',
  components: { Account },
  computed: {
    aspsp() {
      return 'abcbank';
    },
    accounts() {
      return this.$store.getters.accounts(this.aspsp);
    },
  },
  methods: {
    handleLogout() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>
