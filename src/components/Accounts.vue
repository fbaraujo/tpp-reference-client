<template>
  <layout-default>
  <div id="accounts">
    <div class="col-main">
      <p class="text-darkpurple Med-px xs-mb5">{{ currentAspsp.name }} - Account balances </p>
      <img src="../assets/logo.png" style="vertical-align:middle"><span class="Lrg-px">Modelo</span>
            <p class="text-gray-lightest xs-mb6">Last updated 10 mins ago</p>
      <h1 class="ui aligned header">Accounts from {{ selectedAspsp.name }}</h1>
      <revoke-accounts-consent :aspsp="selectedAspsp"/>
      <div class="ui hidden divider"></div>
      <div class="ui error message" v-if="sessionExpired">
        <div class="header">Your session has expired</div>
        <p>Please <a href="/">login</a> again.</p>
      </div>
      <account v-for="account in accounts"
        v-bind:key="account.AccoundId"
        v-bind:account="account"
        v-bind:aspsp="selectedAspsp.id">
      </account>
      <div class="ui hidden divider"></div>
      <logout/>
    </div>
  </div>
</layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import Account from './Account';
import Logout from './Logout';
import RevokeAccountsConsent from './RevokeAccountsConsent';
import LayoutDefault from './layouts/Default';

export default {
  name: 'accounts',
  components: { Account, Logout, LayoutDefault, RevokeAccountsConsent },
  computed: {
    sessionExpired() {
      return !this.isLoggedIn;
    },
    ...mapGetters(['isLoggedIn', 'selectedAspsp']),
    accounts() {
      const accounts = this.$store.getters.accounts(this.selectedAspsp.id);
      if (!Array.isArray(accounts) || accounts.length === 0) {
        this.$store.dispatch('populateAccounts');
      }
      return accounts;
    },
  },
  beforeMount() {
    this.$store.dispatch('refreshSelectedAspsp');
    if (!this.selectedAspsp) {
      this.$router.push('/aspsp-selection');
    }
  },
};
</script>

<style>
body {
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.06);
  color: #545454;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 800px;
  padding: 2em 2em 4em;
}
</style>
