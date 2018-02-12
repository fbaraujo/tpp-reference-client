<template>
  <div class="col-container">
     <header>
      <a href="/select_activity.html"><img src="../assets/M_smlp.png"></a>
      <a href="/index.html"><img src="../assets/Exit.png" class="logout"></a>
      </header>

      <aside class="col">
          <div>
      <img src="../assets/dashboard_icon.png" style="vertical-align:middle" class="xs-mr1"><a href="#" @click="activitySelection()">Dashboard</a>
          </div>
      </aside>

  <div class="col-main clearfix">
      <p class="text-darkpurple Med-px xs-mb5">Select Bank account</p>
      <p class="Sml-px text-gray ptext xs-mb2">Please select the bank that you would like to view the account balances from. Once you have selected the preferred bank, you will be redirected to login to the bank.</p>

      <section>
      <div class="">
          <a href="/consent_view_balance.html"><img src="../assets/logo.png" style="vertical-align:middle"></a><span class="logo-txt Lrg-px">Modelo</span><br>
      </div>
          <div class="after-righta"><hr></div>
      </section>

      <div class="ui divided items center">
         <aspsp-select v-for="aspsp in aspsps"
           v-bind:key="aspsp.id"
           v-bind:aspsp="aspsp">
         </aspsp-select>
       </div>
  </div>
  s
  </div>
</template>

<!-- <div id="aspsp-selection">
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
</div> -->

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
