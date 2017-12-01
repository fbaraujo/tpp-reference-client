<template>
  <div id="payment-completed">
    <div class="ui container">
      <h1 class="ui aligned header">Payment Completed</h1>
      <div class="ui hidden divider"></div>
      <logout></logout>
    </div>
  </div>
</template>
<script>
import Logout from './Logout';

export default {
  name: 'payment-completed',
  components: { Logout },
};
</script>
