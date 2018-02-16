<template>
  <layout-default>
  <div id="payment-submitted" class="col-main">
    <div class="ui container">
      <h1 class="ui aligned header payment-status">Payment
        <span class="pending" v-if="paymentSubmissionPending">pending</span>
        <span class="submitted" v-if="paymentSubmissionSubmitted">submitted</span>
        <span class="failed" v-if="paymentSubmissionFailed">failed</span>
      </h1>
      <div class="ui hidden divider"></div>
      <div class="ui message" v-if="paymentSubmissionPending">
        <div class="header">Payment submission in progress.</div>
        <p>Do not close window.</p>
      </div>
      <div class="ui message" v-if="paymentSubmissionSubmitted">
        <div class="header">Payment submitted successfully.</div>
      </div>
      <div class="ui message" v-if="paymentSubmissionFailed">
        <div class="header">Payment submission failed.</div>
      </div>
      <!-- <logout></logout> -->
    </div>
  </div>
  </layout-default>
</template>

<script>
import Logout from './Logout';
import LayoutDefault from './layouts/Default';

export default {
  name: 'payment-submitted',
  components: { Logout, LayoutDefault },
  computed: {
    paymentSubmissionPending() {
      return this.$store.getters.paymentSubmissionPending();
    },
    paymentSubmissionSubmitted() {
      return this.$store.getters.paymentSubmissionSubmitted();
    },
    paymentSubmissionFailed() {
      return this.$store.getters.paymentSubmissionFailed();
    },
  },
  beforeMount() {
    const interactionId = this.$store.getters.paymentInteractionId();
    this.$store.dispatch('paymentSubmission', interactionId);
  },
};
</script>
