<template>
  <div class="account card">
    <div class="content">
      <div class="balance ui right floated header" v-for="balance in balances">
        {{ balance.Amount.Amount }} {{ balance.Amount.Currency }}
      </div>
      <div class="header">
        {{ product.ProductName }}
        {{ ' - ' }}
        Current Account
      </div>
      <div class="meta">
        {{ account.Nickname }}
        {{ ' - '}}
        {{ account.Account.Name }}
      </div>
      <div className="description">
        {{sortCodeAndAccountNumber}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
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
.account.card {
  width: 390px;
}
</style>
