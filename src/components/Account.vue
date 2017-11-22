<template>
  <div>
    <div class="row">
      <div class="account">
        <p class="product-name">{{ product ? product.ProductName : '' }}</p>
        <p class="sort-code-account-number">{{sortCodeAndAccountNumber}}</p>
      </div>
      <div class="balances">
        <balance-booked v-bind:balances="balances"></balance-booked>
        <br />
        <balance-available v-bind:balances="balances"></balance-available>
      </div>
      <!--
      <div class="meta">
        {{ account.Nickname }}
        {{ ' - '}}
        {{ account.Account.Name }}
      </div>
      -->
    </div>
    <hr>
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
        const sortCode1 = this.account.Account.Identification.substring(0, 2);
        const sortCode2 = this.account.Account.Identification.substring(2, 4);
        const sortCode3 = this.account.Account.Identification.substring(4, 6);
        const accountNumber = this.account.Account.Identification.substring(6);
        return `${sortCode1} - ${sortCode2} - ${sortCode3} | ${accountNumber}`;
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
.row {
  width: 70%;
  display: inline-block;
}
hr {
  width: 70%;
  margin-top: 15px;
  margin-left: 0px;
}
.account {
  display: inline-block;
}
.product-name {
  font-size: 17px;
  padding: 0;
  margin-top: 0;
  margin-bottom: 3px;
}
.sort-code-account-number {
  margin: 0;
  font-size: 13px;
}
.balances {
  float: right;
}
</style>
