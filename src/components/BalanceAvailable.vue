<template>
  <span class="balance-available" v-if="availableBalance">
    <span class="label">Available: </span>
    <span class="amount">{{
      formatAmount(availableBalance.CreditDebitIndicator,
        availableBalance.Amount.Amount,
        availableBalance.Amount.Currency)
    }}</span>
  </span>
</template>

<script>
const currencyFormatter = require('currency-formatter');

export default {
  name: 'balance-available',
  props: ['availableBalance'],
  methods: {
    formatAmount(debitcredit, amount, code) {
      const formatted = currencyFormatter.format(amount, { code });
      if (debitcredit === 'Debit') {
        return `-${formatted}`;
      }
      return formatted;
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
