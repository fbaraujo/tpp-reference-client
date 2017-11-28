<template>
  <div id="make-payment">
    <div class="ui container">
      <h1 class="ui aligned header">Make Payment</h1>
      <div class="ui hidden divider"></div>
      <form class="ui form" @submit.prevent="makePayment({ name, sortCode, accountNumber, amount })">
        <h4 class="ui dividing header">Enter beneficiary</h4>
        <div class="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Full name" v-model="name">
        </div>
        <div class="field">
          <label>Sort Code</label>
          <input type="text" name="sort-code" maxlength="6" placeholder="XXXXXX" v-model="sortCode">
        </div>
        <div class="field">
          <label>Account Number</label>
          <input type="text" name="account-number" maxlength="8" placeholder="XXXXXXXX" v-model="accountNumber">
        </div>
        <div class="field">
          <label>Amount</label>
          <input type="text" name="amount" placeholder="00.00" v-model="amount">
        </div>
        <button class="ui button" type="submit">Confirm</button>
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
  data() {
    return {
      name: null,
      sortCode: null,
      accountNumber: null,
      amount: null,
    };
  },
  components: { Logout },
  methods: {
    makePayment() {
      if (!this.name ||
        !this.sortCode ||
        !this.accountNumber ||
        !this.amount) {
        return;
      }
      if (this.name.trim().length === 0 ||
        this.sortCode.trim().length === 0 ||
        this.accountNumber.trim().length === 0 ||
        this.amount.trim().length === 0) {
        return;
      }
      this.name = this.name.trim();
      this.sortCode = this.sortCode.trim();
      this.accountNumber = this.accountNumber.trim();
      this.amount = this.amount.trim();
    },
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
