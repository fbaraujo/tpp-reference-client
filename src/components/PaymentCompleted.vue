<template>
  <div id="payment-completed">
    <div class="ui container">
      <h1 class="ui aligned header">Payment
        <span v-if="paymentSubmissionPending">pending</span>
        <span v-if="paymentSubmissionCompleted">completed</span>
        <span v-if="paymentSubmissionFailed">failed</span>
      </h1>
      <div class="ui hidden divider"></div>
      <div class="ui message" v-if="paymentSubmissionPending">
        <div class="header">Payment submission in progress.</div>
        <p>Do not close window.</p>
      </div>
      <div class="ui message" v-if="paymentSubmissionCompleted">
        <div class="header">Payment submission completed</div>
      </div>
      <div class="ui message" v-if="paymentSubmissionFailed">
        <div class="header">Payment submission failed</div>
      </div>
      <logout></logout>
    </div>
  </div>
</template>

<script>
import Logout from './Logout';

export default {
  name: 'payment-completed',
  components: { Logout },
  computed: {
    paymentSubmissionPending() {
      return this.$store.getters.paymentSubmissionPending();
    },
    paymentSubmissionCompleted() {
      return this.$store.getters.paymentSubmissionCompleted();
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
