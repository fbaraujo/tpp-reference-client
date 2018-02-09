<template>
  <div id="make-payment">
    <div class="ui container">
      <h1 class="ui aligned header">Make a payment</h1>
      <div class="ui hidden divider"></div>
      <form class="ui form" @submit.prevent="makePayment({ name, sortCode, accountNumber, amount })">
        <h4 class="ui dividing header">Enter beneficiary</h4>
        <div class="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Full name" v-model.trim="name"/>
        </div>
        <div class="field">
          <label>Sort Code</label>
          <input type="text" name="sort-code" maxlength="6" placeholder="XXXXXX" v-model.trim="sortCode"/>
        </div>
        <div class="field">
          <label>Account Number</label>
          <input type="text" name="account-number" maxlength="8" placeholder="XXXXXXXX" v-model.trim="accountNumber"/>
        </div>
        <div class="field">
          <label>Amount</label>
          <input type="number" name="amount" placeholder="00.00" step="0.01" min="0" v-model.number="amount"/>
        </div>
        <button name="confirm-payment" class="ui button confirm-payment" type="submit">Confirm</button>
      </form>
      <div class="ui hidden divider"></div>
      <logout></logout>
    </div>
  </div>
</template>
<script>
import Logout from './Logout';

export default {
  name: 'make-payment',
  components: { Logout },
  methods: {
    makePayment() {
      if (!this.name ||
        !this.sortCode ||
        !this.accountNumber ||
        !this.amount) {
        return;
      }
      if (this.name.length === 0 ||
        this.sortCode.length === 0 ||
        this.accountNumber.length === 0 ||
        this.amount.length === 0) {
        return;
      }
      const payment = {
        name: this.name,
        sortCode: this.sortCode,
        accountNumber: this.accountNumber,
        amount: this.amount,
      };
      this.$store.dispatch('makePayment', payment);
      this.$router.push('aspsp-selection');
    },
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
