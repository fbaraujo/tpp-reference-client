<template>
  <div id="accounts">
    <h1 class="ui aligned header">Accounts</h1>
    <div class="ui container">
      <div class="ui cards">
        <account v-for="account in accounts"
          v-bind:key="account.AccoundId"
          v-bind:account="account">
        </account>
      </div>
    </div>
  </div>
</template>

<script>
import Account from './Account';

export default {
  name: 'accounts',
  components: { Account },
  computed: {
    accounts() {
      const list = this.$store.getters.accounts('abcbank');
      return list;
    },
    product(accountId) {
      const product = this.$store.getters.product(accountId);
      return product;
    },
  },
  data() {
    return { };
  },
};
</script>
