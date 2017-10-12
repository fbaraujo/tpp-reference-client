<template>
  <div class="account item">
    <div class="content">
      <div class="balance ui right floated large header" v-for="balance in balances">
        {{ formatAmount(balance.Amount.Amount, balance.Amount.Currency) }}
        <br />
        <span class="available">Available: {{ formatAmount(balance.Amount.Amount, balance.Amount.Currency) }}</span>
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
export default {
  name: 'account',
  props: ['account', 'aspsp'],
  methods: {
    formatAmount(amount, currencyCode) {
      return parseFloat(amount).toLocaleString('en', { style: 'currency', currency: currencyCode });
    },
  },
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
    bookedBalance() {
      return this.$store.getters.balances(this.aspspAccountId)[0];
    },
    availableBalance() {
      return [this.$store.getters.balances(this.aspspAccountId)[1]];
    },
    balances() {
      return [this.$store.getters.balances(this.aspspAccountId)[0]];
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
.available {
  font-size: 10pt;
  margin-top: 0pt;
}
</style>
