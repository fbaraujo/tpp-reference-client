<template>
  <div>
    <div class="row">
      <div class="account">
        <p class="product-name">{{ product ? product.ProductName : 'Current Account' }}</p>
        <p class="sort-code-account-number">{{sortCodeAndAccountNumber}}</p>
      </div>
      <div class="balances">
        <balance-booked
          v-bind:balances="balances"
          v-bind:availableBalance="availableBalance"></balance-booked>
        <br />
        <balance-available v-bind:availableBalance="availableBalance"></balance-available>
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

const groupby = require('lodash.groupby');
const sortby = require('lodash.sortby');

export default {
  name: 'account',
  components: { BalanceAvailable, BalanceBooked },
  props: ['account', 'aspsp'],
  methods: {
    isAvailableBalance(balance) {
      switch (balance.Type) {
        case 'ClosingAvailable':
        case 'InterimAvailable':
        case 'OpeningAvailable':
        case 'ForwardAvailable':
          return true;
        default:
          return false;
      }
    },
    sortDatetimeDescending(balances) {
      return sortby(balances, b => b.DateTime).reverse();
    },
    bestMatchWithoutDateTime(list) {
      const byType = groupby(list, b => b.Type);
      if (byType.ClosingAvailable) return byType.ClosingAvailable[0];
      if (byType.InterimAvailable) return byType.InterimAvailable[0];
      if (byType.OpeningAvailable) return byType.OpeningAvailable[0];
      if (byType.ForwardAvailable) return byType.ForwardAvailable[0];
      return null;
    },
    bestMatch(available) {
      const orderedByDate = this.sortDatetimeDescending(available);
      const latestDateTime = orderedByDate[0].DateTime;
      const byDatetime = groupby(available, b => b.DateTime);
      const recent = byDatetime[latestDateTime];
      if (recent.length > 1) {
        return this.bestMatchWithoutDateTime(recent);
      }
      return recent[0];
    },
  },
  computed: {
    availableBalances() {
      return this.balances.filter(this.isAvailableBalance);
    },
    availableBalance() {
      const available = this.availableBalances;
      if (available.length > 0) {
        return this.bestMatch(available);
      }
      return null;
    },
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
