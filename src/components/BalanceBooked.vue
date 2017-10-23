<template>
  <span class="balance-booked" v-if="bookedBalance">
    {{ formatAmount(bookedBalance.Amount.Amount, bookedBalance.Amount.Currency) }}
  </span>
</template>

<script>
export default {
  name: 'balance-booked',
  props: ['balances'],
  methods: {
    formatAmount(amount, currencyCode) {
      const format = {
        style: 'currency',
        currency: currencyCode,
      };
      return parseFloat(amount).toLocaleString('en', format);
    },
  },
  computed: {
    bookedBalance() {
      if (this.balances.length === 0) {
        return null;
      } if (this.balances.length === 1) {
        switch (this.balances[0].Type) {
          case 'ClosingBooked':
          case 'InterimBooked':
          case 'OpeningBooked':
          case 'PreviouslyClosedBooked':
            return this.balances[0];
          default:
            return '';
        }
      } else {
        return null;
      }
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
