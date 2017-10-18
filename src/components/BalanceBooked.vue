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
