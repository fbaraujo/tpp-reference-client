<template>
  <layout-default>
    <div class="col-main">
      <p class="text-darkpurple Med-px xs-mb5">Select Activity</p>
      <p class="EX-px text-gray xs-mb2">What would you like to do?</p>
      <section>
        <div class="">
        <button class="Med-px button-two xs-my1" @click="viewBalances()">
            View Account Balance</button><br>
        <button class="Med-px button-two xs-my1">
            View Transaction History</button><br>
         <button class="Med-px button-two xs-my1" @click="makePayment()">
             Make Transfer or Payment</button><br>
        <button class="Med-px button-two xs-my1 xs-mb4">
            Make an International Payment</button><br>
        </div>
      </section>
    </div>
  </layout-default>
</template>

<script>
import LayoutDefault from './layouts/Default';

export default {
  name: 'activity-selection',
  components: { LayoutDefault },
  methods: {
    viewBalances() {
      this.$store.dispatch('changeScope', 'accounts');
      this.$router.push('aspsp-selection');
    },
    makePayment() {
      this.$store.dispatch('changeScope', 'payments');
      this.$router.push('/make-payment');
    },
  },
};
</script>
