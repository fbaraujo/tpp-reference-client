<template>
  <div id="redirect" class="ui warning message" >
    <div class="header">Redirection</div>
    <p>You are now leaving (TPP) and we are securely<br />transfering you over to {{ currentAspsp.name }}</p>
  </div>
</template>

<script>
const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);

export default {
  name: 'redirect',
  computed: {
    currentAspsp() {
      return this.$store.getters.selectedAspsp();
    },
  },
  beforeMount() {
    this.$store.dispatch('refreshSelectedAspsp');
    if (!this.currentAspsp) {
      this.$router.push('/aspsp-selection');
    }
  },
  async mounted() {
    let action;
    const currentScope = this.$store.getters.currentScope();
    const payload = { aspsp: this.currentAspsp };

    switch (currentScope) {
      case 'accounts':
        action = 'accountRequestAuthoriseConsent';
        break;
      case 'payments':
        action = 'paymentRequestAuthoriseConsent';
        payload.confirmedPayment = this.$store.getters.confirmedPayment();
        break;
      default:
        throw new Error(`Redirect: Unknown scope [${currentScope}]!`);
    }
    const result = await Promise.all(
      [
        this.$store.dispatch(action, payload),
        new Promise(resolve => setTimeout(resolve, redirectionTime * 1000, 'foo')),
      ]);
    const uri = result[0];
    if (uri) {
      window.location = uri;
    } else {
      this.$router.push('/aspsp-selection');
    }
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
