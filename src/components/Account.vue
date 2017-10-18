<template>
  <div class="account item">
    <div class="content">
      <div class="balance ui right floated large header">
        <balance-booked v-bind:balances="balances"></balance-booked>
        <br />
        <balance-available v-bind:balances="balances"></balance-available>
      </div>
      <div class="ui medium header">
        {{ product.ProductName }}
        {{ ' - ' }}
        Current Account
      </div>
      <!--
      <div class="meta">
        {{ account.Nickname }}
        {{ ' - '}}
        {{ account.Account.Name }}
      </div>
      -->
      <div className="description">
        {{sortCodeAndAccountNumber}}
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
import BalanceAvailable from './BalanceAvailable';
import BalanceBooked from './BalanceBooked';

export default {
  name: 'account',
  components: { BalanceAvailable, BalanceBooked },
  props: ['account', 'aspsp'],
  computed: {
    sortCodeAndAccountNumber() {
      if (this.account.Account.SchemeName === 'SortCodeAccountNumber') {
        const sortCode = this.account.Account.Identification.substring(0, 6);
        const accountNumber = this.account.Account.Identification.substring(6);
        return `${sortCode} ${accountNumber}`;
      }
      return '';
    },
    aspspAccountId() {
      return `${this.aspsp}-${this.account.AccountId}`;
    },
    balances() {
      return this.$store.getters.balances(this.aspspAccountId);
    },
    product() {
      return this.$store.getters.product(this.aspspAccountId);
    },
  },
  data() {
    return { };
  },
};
</script>

<style scoped>
.account.item {
  width: 390px;
}
</style>
