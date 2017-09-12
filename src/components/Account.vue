<template>
  <div class="account card">
    <div class="content">
      <div class="ui right floated header" v-for="balance in balances">
        {{ balance.Amount.Amount }} {{ balance.Amount.Currency }}
      </div>
      <div class="header">
        {{ product.ProductName }}
        {{ ' - ' }}
        {{ product.ProductType }}
      </div>
      <div class="meta">
        {{ account.Nickname }}
        {{ ' - '}}
        {{ account.Account.Name }}
      </div>
      <div className="description">
        {{ account.Servicer.Identification.replace('SC', '')}}
        {{account.Account.Identification}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: ['account', 'aspsp'],
  computed: {
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
