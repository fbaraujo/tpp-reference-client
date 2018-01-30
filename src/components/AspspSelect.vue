<template>
  <div class="aspsp-select item">
    <div class="ui hidden divider"></div>
    <div class="ui tiny image">
      <img v-if="hasLogo" :src="logoUri" height="40">
    </div>
    <div class="middle aligned content">
      <div class="header">
        <a class="select-aspsp" v-on:click="selectAspsp(aspsp)">{{ name }}</a>
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
export default {
  name: 'aspsp-select',
  props: ['aspsp'],
  computed: {
    name() {
      return this.aspsp.name;
    },
    logoUri() {
      return this.aspsp.logoUri;
    },
    hasLogo() {
      // return this.logoUri && this.logoUri !== '';
      // todo: need to check logo URI valid on server before attempting to display
      // for now return false
      return false;
    },
    currentScopeAccounts() {
      return this.$store.getters.currentScope() === 'accounts';
    },
  },
  methods: {
    selectAspsp(selectedAspsp) {
      this.$store.dispatch('selectAspsp', selectedAspsp);
      if (this.currentScopeAccounts && selectedAspsp.accountsConsentGranted) {
        this.$router.push('/accounts');
      } else {
        this.$router.push('/redirect');
      }
    },
  },
};
</script>

<style scoped>
  .aspsp-select.item {
    width: 70%;
  }
</style>
