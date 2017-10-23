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
    isBookedBalance(balance) {
      switch (balance.Type) {
        case 'ClosingBooked':
        case 'InterimBooked':
        case 'OpeningBooked':
        case 'PreviouslyClosedBooked':
          return true;
        default:
          return false;
      }
    },
    sortDatetimeDescending(balances) {
      return balances.sort((a, b) => {
        if (a.DateTime > b.DateTime) {
          return -1;
        }
        if (a.DateTime < b.DateTime) {
          return 1;
        }
        return 0;
      });
    },
  },
  computed: {
    bookedBalance() {
      let balance = null;
      let booked = this.balances.filter(this.isBookedBalance);
      booked = this.sortDatetimeDescending(booked);
      if (booked.length > 0) {
        balance = booked[0];
      }
      return balance;
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
