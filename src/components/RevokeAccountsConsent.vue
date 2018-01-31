<template>
  <button v-if="accountsAndConsentGranted" name="revoke-consent"
  class="ui small button" @click="revokeAccountsConsent()">
    revoke consent
  </button>
</template>

<script>
export default {
  name: 'revoke-accounts-consent',
  props: ['aspsp'],
  computed: {
    accountsAndConsentGranted() {
      return this.aspsp.accountsConsentGranted;
    },
  },
  methods: {
    revokeAccountsConsent() {
      this.$store.dispatch('revokeAccountsConsent', this.aspsp.id);
    },
  },
};
</script>

<style scoped>
  button[name=revoke-consent] {
    float: right;
  }
</style>
