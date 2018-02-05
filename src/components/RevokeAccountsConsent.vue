<template>
  <div class="revoke-consent">
    <button v-if="accountsAndConsentGranted" name="revoke-consent"
      class="ui small button" @click="revokeAccountsConsent()">
      Revoke consent
    </button>
    <span v-if="!accountsAndConsentGranted"
      id="consent-revoked"
      class="ui positive message">Consent revoked</span>
  </div>
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
  .revoke-consent {
    float: right;
  }
</style>
