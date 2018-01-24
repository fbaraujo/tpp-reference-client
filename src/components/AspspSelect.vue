<template>
  <div class="aspsp-select item">
    <div class="ui hidden divider"></div>
    <div class="ui tiny image">
      <img v-if="hasLogo" :src="logoUri" height="40">
    </div>
    <section>
      <div class="">
        <button class="select-aspsp Lrg-px button-two xs-my1" v-on:click="selectAspsp(aspsp)">{{ name }}</button>
      </div>
    </section>
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
  },
  methods: {
    selectAspsp(selectedAspsp) {
      this.$store.dispatch('selectAspsp', selectedAspsp);
      this.$router.push('/redirect');
    },
  },
};
</script>

<style scoped>
  .aspsp-select.item {
    width: 70%;
  }
</style>
