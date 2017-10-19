<template>
  <span class="balance-available">
    <span class="label">Available: </span>
    <span class="amount">{{ formatAmount(availableBalance.Amount.Amount, availableBalance.Amount.Currency) }}</span>
  </span>
</template>

<script>
export default {
  name: 'balance-available',
  props: ['balances'],
  methods: {
    formatAmount(amount, currencyCode) {
      return parseFloat(amount).toLocaleString('en', { style: 'currency', currency: currencyCode });
    },
  },
  computed: {
    availableBalance() {
      return this.balances[1];
    },
  },
};
</script>

<style scoped>
.balance-available {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #545454;
  margin-top: 3px;
}
.balance-available .label {
  font-size: 12px;
}
.balance-available .amount {
  font-size: 14px;
}
</style>
