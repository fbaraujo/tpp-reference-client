<template>
  <div id="redirect" class="ui warning message" >
    <!-- <div class="header">Redirection</div> -->
    <p>{{ message }}</p>
      <div><img src="../assets/L1.gif" alt="Animated gif"></div>
  </div>
</template>

<script>
const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);

export default {
  name: 'redirect',
  data() {
    return { message: '' };
  },
  computed: {
    currentAspsp() {
      return this.$store.getters.selectedAspsp();
    },
  },
  beforeMount() {
    this.$store.dispatch('refreshSelectedAspsp');
  },
  async mounted() {
    let action;
    const currentScope = this.$store.getters.currentScope();
    if (!currentScope) {
      this.message = 'Unfortunately you have not selected an activity. You will be redirected to activity selection page.';
      await new Promise(resolve => setTimeout(resolve, redirectionTime * 1000));
      return this.$router.push('/activity-selection');
    }

    const payload = { aspsp: this.$store.getters.selectedAspsp() };
    if (!payload.aspsp) {
      this.message = 'Unfortunately you have not selected ASPSP. You will be redirected to ASPSP selection page.';
      await new Promise(resolve => setTimeout(resolve, redirectionTime * 1000));
      return this.$router.push('/aspsp-selection');
    }

    switch (currentScope) {
      case 'accounts':
        action = 'accountRequestAuthoriseConsent';
        break;
      case 'payments':
        action = 'paymentRequestAuthoriseConsent';
        payload.confirmedPayment = this.$store.getters.confirmedPayment();
        break;
      default:
        break;
    }
    this.message = `You are now leaving Moinda and we are transfering you over to ${this.$store.getters.selectedAspsp().name}`;
    const result = await Promise.all(
      [
        this.$store.dispatch(action, payload),
        new Promise(resolve => setTimeout(resolve, redirectionTime * 1000, 'foo')),
      ]);
    const uri = result[0];
    if (uri) {
      window.location = uri;
      return null;
    }
    this.$data.message = `Unfortunately we have been unable to connect to ${this.$store.getters.selectedAspsp().name}. In the meantime, you will be redirected to ASPSP selection page. Please feel free to try again later.`;
    await new Promise(resolve => setTimeout(resolve, redirectionTime * 1000));
    return this.$router.push('/aspsp-selection');
  },
};
</script>

<style scoped>
.form, .error, button {
  width: 390px;
}
</style>
