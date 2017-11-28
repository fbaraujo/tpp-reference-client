<template>
  <div id="make-payment">
    <div class="ui container">
      <h1 class="ui aligned header">Make Payment</h1>
      <div class="ui hidden divider"></div>
      <form class="ui form">
        <h4 class="ui dividing header">Enter beneficiary</h4>
        <div class="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Full name">
        </div>
        <div class="field">
          <label>Sort Code</label>
          <input type="text" name="sort-code" maxlength="6" minlength="6" placeholder="XXXXXX">
        </div>
        <div class="field">
          <label>Account Number</label>
          <input type="text" name="account-number" maxlength="8" minlength="8" placeholder="XXXXXXXX">
        </div>
        <div class="field">
          <label>Amount</label>
          <input type="text" name="amount" placeholder="00.00">
        </div>
        <button class="ui button" type="submit">Submit</button>
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
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
