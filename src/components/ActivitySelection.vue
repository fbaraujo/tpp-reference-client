<template>
  <div id="activity-selection">
    <div class="ui container">
      <h1 class="ui aligned header">Select activity</h1>
      <div class="ui hidden divider"></div>
      <div class="ui divided items">
        <div class="item">
          <button name="view-balances" class="ui large submit button view-balances" @click="viewBalances()">
            View Balances
          </button>
        </div>
        <div class="item">
          <button name="make-payment" class="ui large submit button" @click="makePayment()">
            Make Payment
          </button>
        </div>
      </div>
      <logout></logout>
    </div>
  </div>
</template>

<script>
import Logout from './Logout';

export default {
  name: 'activity-selection',
  components: { Logout },
  computed: { },
  methods: {
    viewBalances() {
      this.$store.dispatch('changeScope', 'accounts');
      this.$router.push('aspsp-selection');
    },
    makePayment() {
      this.$store.dispatch('changeScope', 'payments');
      this.$router.push('/activity-selection');
    },
  },
};
</script>
