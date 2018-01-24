<template>
  <div id="redirect-back" class="ui warning message" >
    <!-- <div class="header">Redirection</div> -->
    <p>You are now leaving (ASPSP) and<br/> we are transfering you back to Madhatter</p>
    <div><img src="../assets/L1.gif" alt="Animated gif"></div>
    <p class="message">{{ this.message }}.</p>
    <button v-if='visibleRetry'  v-on:click='retry();'>Click to retry</button>
  </div>
</template>

<script>
const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);
const { parseState } = require('../utils/redirect-back');

export default {
  name: 'redirect-back',
  data() {
    return {
      message: '',
      visibleRetry: false,
    };
  },
  methods: {
    retry() {
      this.$data.message = 'Retrying....';
      this.$data.visibleRetry = false;
      this.$router.push('login');
    },
    validateParams() {
      return !!this.$route.query.code && !!this.$route.query.state;
    },
    checkErrors() {
      const { error } = this.$route.query;
      if (error) {
        if (error === 'access_denied') {
          throw new Error('authorisation consent not provided');
        }
        throw new Error(error);
      }
    },
    validateSessionId(sessionId) {
      return sessionId === localStorage.getItem('session_id');
    },
  },
  beforeMount() {
    this.$data.message = 'Validating request';
  },
  async mounted() {
    try {
      this.checkErrors();
      if (!this.validateParams()) {
        throw new Error('Invalid request');
      }
      const state = parseState(this.$route.query.state);
      const { interactionId, sessionId, scope } = state;
      if (!this.validateSessionId(sessionId)) {
        throw new Error('Invalid session');
      }
      if (scope) {
        this.$store.dispatch('changeScope', scope);
      }
      this.$data.message = 'Request validated. Processing...';
      const authorisationCode = this.$route.query.code;
      state.authorisationCode = authorisationCode;
      const result = await Promise.all(
        [
          this.$store.dispatch('validateAuthCode', state),
          new Promise(resolve => setTimeout(resolve, redirectionTime * 1000, true)),
        ],
      );
      if (result[0] !== true) {
        throw new Error('Validation code error');
      }

      if (scope === 'payments') {
        await this.$store.dispatch('setPaymentInteractionId', interactionId);
        return this.$router.push('/payment-submitted');
      }
      return this.$router.push('/accounts');
    } catch (e) {
      this.$data.message = `Unfortunately your request is invalid (${e.message}) and it has been cancelled. In the meantime, you will be redirected to ASPSP selection page. Please feel free to tray again later`;
      this.$data.visibleRetry = true;
      window.setTimeout(() => {
        this.$router.push('/activity-selection');
      }, redirectionTime * 1000);
    }
    return null;
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
