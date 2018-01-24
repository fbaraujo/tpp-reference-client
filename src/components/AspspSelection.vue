<template>
  <div id="aspsp-selection">
    <div class="ui container">
      <h2 class="ui aligned header">Select preferred ASPSP account</h2>
      <p>Please select the bank that you would like to view the account balances from. Once you have <br> selected the preferred bank, you will be redirected to login to the bank.
</p>
      <div class="ui hidden divider"></div>
      <div></div>
      <div class="ui divided items center">
         <aspsp-select v-for="aspsp in aspsps"
           v-bind:key="aspsp.id"
           v-bind:aspsp="aspsp">
         </aspsp-select>
       </div>
    </div>
    <div class="ui hidden divider"></div>
    <logout></logout>
  </div>
</template>

<script>
import AspspSelect from './AspspSelect';
import Logout from './Logout';

export default {
  name: 'aspsp-selection',
  components: { AspspSelect, Logout },
  computed: {
    aspsps() {
      const aspsps = this.$store.getters.aspsps;
      if (!Array.isArray(aspsps) || aspsps.length === 0) {
        this.$store.dispatch('fetchAspsps');
      }
      return aspsps;
    },
  },
};
</script>
