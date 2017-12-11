<template>
  <div id="redirect-back" class="ui warning message" >
    <div class="header">Redirection</div>
    <p>You are now redirected back<br /> to TPP application</p>
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
    validateSessionId(sessionId) {
      return sessionId === localStorage.getItem('token');
    },
  },
  beforeMount() {
    this.$data.message = 'Validating request';
  },
  async mounted() {
    try {
      if (!this.validateParams()) {
        throw new Error('Invalid request');
      }
      const { authorisationServerId, interactionId, sessionId, scope } = parseState(this.$route.query.state); //eslint-disable-line
      if (!this.validateSessionId(sessionId)) {
        throw new Error('Invalid session');
      }
      if (scope) {
        this.$store.dispatch('changeScope', scope);
      }
      this.$data.message = 'Request validated. Processing...';
      const authorisationCode = this.$route.query.code;
      const result = await Promise.all(
        [
          this.$store.dispatch('validateAuthCode', { authorisationServerId, authorisationCode }),
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
        this.$router.push('/aspsp-selection');
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
