<template>
  <div id="payment-submitted">
    <div class="ui container">
      <h1 class="ui aligned header">Payment
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
      <logout></logout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logout from './Logout';

export default {
  name: 'payment-submitted',
  components: { Logout },
  computed: {
    ...mapGetters([
      'paymentSubmissionFailed',
      'paymentSubmissionPending',
      'paymentSubmissionSubmitted',
      'paymentInteractionId',
    ]),
  },
  beforeMount() {
    const interactionId = this.paymentInteractionId;
    this.$store.dispatch('paymentSubmission', interactionId);
  },
};
</script>
