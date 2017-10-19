<template>
  <span class="balance-booked">
    {{ formatAmount(bookedBalance.Amount.Amount, bookedBalance.Amount.Currency) }}
  </span>
</template>

<script>
export default {
  name: 'balance-booked',
  props: ['balances'],
  methods: {
    formatAmount(amount, currencyCode) {
      return parseFloat(amount).toLocaleString('en', { style: 'currency', currency: currencyCode });
    },
  },
  computed: {
    bookedBalance() {
      return this.balances[0];
    },
  },
};
</script>

<style scoped>
.balance-booked {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 26px;
  font-weight: bold;
}
</style>
