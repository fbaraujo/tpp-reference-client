<template>
  <span class="balance-available">
    {{ formatAmount(availableBalance.Amount.Amount, availableBalance.Amount.Currency) }}
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
  font-size: 10pt;
  margin-top: 0pt;
}
</style>
