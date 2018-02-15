<template>
  <layout-default>
    <div class="col-main">
        <p class="text-darkpurple Med-px xs-mb5">Consent to make a payment</p>
        <p class="Sml-px text-gray ptext xs-mb2">You have selected Modelo bank to make a payment. Do you give consent<br>for Moinda to make the following payment?</p>
        <div class="">
            <p class="EX-px xs-my4">Payment details</p>
        </div>
        <section>
        <div class="">
            <b>To</b>
            <!-- <p class="EX-px">Roger Brown</p>
            <p class="xs-mb4">26 - 55 - 29 | 74560210</p> -->
        </div>
            <div>
            <p class="Med-px medium">Amount</p>
            <!-- <p>£150.00</p> -->
            </div>
             <div>
                 <p class="Med-px xs-mt4 medium">Reference:</p>
                <!-- <p>Deposit for Stag do</p> -->
            </div>
            <button class="Med-px button-sml1 xs-my4"  @click="makePayment()">Cancel</button>
            <button class="Med-px button-sml2 xs-my4" @click="">Confirm</button>
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
