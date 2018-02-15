<template>
  <layout-default>
    <div class="col-main">
        <p class="text-darkpurple Med-px xs-mb5">Make a payment</p>
        <p class="Med-px text-gray xs-mb2">Please enter the recipent's payment details:</p>

        <section>
        <div class="">
            <p class="xs-my1 medium">Recipent Name</p>
            <input id="input" type="text" class="xs-mb2">
            <p class="xs-my1 medium">Sortcode</p>
            <input id="input" type="text" class="xs-mb2">
            <p class="xs-my1 medium">Account No</p>
            <input id="input" type="text" class="xs-mb2">
            <p class="xs-my1 medium">Amount (£)</p>
            <input id="input" type="text" class="xs-mb2">
            <p class="xs-my1 medium">Reference (optional)</p>
            <input id="input" type="text" class="xs-mb2">
        </div>
            <a href="aspsp-selection"><button class="Med-px button-two xs-my4">Continue</button></a>
        </section>
    </div>
  <!-- <div class="page-align">
        <p class="">Please enter the recipent's payment details:</p>
        <p class="">Recipent Name</p>
          <input id="input1" type="text" class="input2">
        <p class="">Sortcode</p>
            <input id="input1" type="text" class="">
        <p class="">Account No</p>
            <input id="input1" type="text" class="">
        <p class="">Account(£)</p>
            <input id="input1" type="text" class="">
        <p class="">Reference (optional)</p>
            <input id="input1" type="text" class="">
            <button class="Lrg-px button-three xs-my5">Continue</button><br>
        </div> -->
  <!-- <div id="">
    <div class="">
      <h2 class="ui aligned header">Make a payment</h2>
      <div class="ui hidden divider"></div>
      <form class="ui form" @submit.prevent="makePayment({ name, sortCode, accountNumber, amount })">
        <h4 class="ui dividing header">Please enter the recipent's payment details:</h4>
        <div class="field">
          <label>Name</label>
          <input id="input1" type="text" class="input2" name="name" placeholder="Full name" v-model.trim="name"/>
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
  </div> -->
  </layout-default>
</template>
<script>
import LayoutDefault from './layouts/Default';
import Logout from './Logout';

export default {
  name: 'make-payment',
  data() {
    return {
      name: 'Sam Morse',
      sortCode: '111111',
      accountNumber: '12345678',
      amount: '10.00',
    };
  },
  components: { LayoutDefault, Logout },
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
