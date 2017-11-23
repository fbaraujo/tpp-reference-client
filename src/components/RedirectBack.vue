<template>
  <div id="redirect-back" class="ui warning message" >
    <div class="header">Redirection</div>
    <p>You are now redirected back<br /> to TPP application</p>
    <p>{{ this.message }}.</p>
    <button v-if='visibleRetry'  v-on:click='retry();'>Click to retry</button>
  </div>
</template>

<script>
const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);

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
    retriveAspspIdAndsessionId() {
      const stateString = this.$route.query.state;
      let state;
      try {
        state = JSON.parse(atob(stateString));
      } catch (e) {
        throw new Error('Invalid state format');
      }
      if (!state.authorisationServerId || !state.sessionId) {
        throw new Error('Missing ASPSP ID');
      }
      return { authorisationServerId: state.authorisationServerId, sessionId: state.sessionId };
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
      const { authorisationServerId, sessionId } = this.retriveAspspIdAndsessionId(); //eslint-disable-line

      if (!this.validateSessionId(sessionId)) {
        throw new Error('Invalid session');
      }
      this.$data.message = 'Request validated. Processing...';
      const authorisationCode = this.$route.query.code;

      const result = await Promise.all(
        [
          this.$store.dispatch('validateAuthCode', { authorisationServerId, authorisationCode }),
          new Promise(resolve => setTimeout(resolve, redirectionTime * 1000, 'foo')),
        ],
      );

      if (result[0] !== true) {
        throw new Error('Validation code error');
      }
      this.$router.push('/accounts');
    } catch (e) {
      this.$data.message = `Request invalid. Your request has been cancelled and you will be redirected. ${e.message}`;
      this.$data.visibleRetry = true;
      window.setTimeout(() => {
        this.$router.push('/aspsp-selection');
      }, redirectionTime * 1000);
    }
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
