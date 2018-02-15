<template>
  <layout-default>
  <div class="col-main">
   <p class="text-darkpurple Med-px xs-mb5">Consent to view bank balance</p>
   <p class="Sml-px text-gray ptext xs-mb2">You have selected Modelo bank to view account balances. Do you give consent<br>for Moinda to access to the following information?</p>

   <div class="">
       <p class="EX-px xs-mt4 xs-mb3">Bank account details:</p>
   </div>

   <section>
   <div class="">
       <p>Account name</p>
       <p>Bank Account Number</p>
       <p>Bank Sort Code</p>
       <p>Balance</p>
   </div>

       <a href="select_activity.html"><button class="Med-px button-sml1 xs-my4">Cancel</button></a>
       <a href="redirect_to_bank.html"><button class="Med-px button-sml2 xs-my4">Confirm</button></a>
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
