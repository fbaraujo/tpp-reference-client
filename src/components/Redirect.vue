<template>
  <layout-default>
    <div class="col-container">
            <div class="col-main">
                <p class="Sml-px text-gray ptext xs-my4">You are now leaving Moinda and we are securely transferring you over to Modelo</p>
                <section>
                    <img src="../assets/light_blue.gif" class="lefta">
                </section>
            </div>
    </div>
</layout-default>
</template>

<script>
import LayoutDefault from './layouts/Default';

const redirectionTime = (process.env.REDIRECT_DELAY_SECONDS || 3);

export default {
  name: 'redirect',
  components: { LayoutDefault },
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
