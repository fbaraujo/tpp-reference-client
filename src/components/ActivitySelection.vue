<template>
  <div class="col-container">
    <header>
      <a href="./ActivitySelection"><img src="../assets/M_smlp.png"></a>
      <a href="./Login"><img src="../assets/Exit.png" class="logout" @click="login()"> </a>
    </header>
    <side-navigation/>
   <div class="col-main">
       <p class="text-darkpurple Med-px xs-mb5">Select Activity</p>
       <p class="EX-px text-gray xs-mb2">What would you like to do?</p>

       <section>
       <div class="">
       <button class="Med-px button-two xs-my1" @click="viewBalances()">
           View Account Balance</button><br>
       <button class="Med-px button-two xs-my1">
           View Transaction History</button><br>
        <button class="Med-px button-two xs-my1" @click="makePayment()">
            Make Transfer or Payment</button><br>
       <button class="Med-px button-two xs-my1 xs-mb4">
           Make an International Payment</button><br>
       </div>
       </section>
   </div>
   </div>

  <!-- <div id="activity-selection">
    <div class="ui container">
      <h2 class="ui aligned header xs-mb2">What would you like to do?</h2>
      <div class="ui hidden divider"></div>
      <div class="ui divided items">
        <div class="item">
          <button name="view-balances" class="Lrg-px button-two xs-my1" @click="viewBalances()">
            View Account Balances
          </button>
        </div>
        <div class="item">
          <button name="make-payment" class="Lrg-px button-two xs-my1" @click="makePayment()">
            Make Payment or Transfer
          </button>
          <div class="item">
            <button class="Lrg-px button-two xs-my1">View Transaction History</button>
          </div>
          <div class="item">
            <button class="Lrg-px button-two xs-my1 xs-mb5">Make an Intenational Payment</button>
          </div>
        </div>
      </div>
      <logout></logout>
    </div>
  </div> -->
</template>

<script>
import Logout from './Logout';
import SideNavigation from './SideNavigation';

export default {
  name: 'activity-selection',
  components: { Logout, SideNavigation },
  computed: { },
  methods: {
    viewBalances() {
      this.$store.dispatch('changeScope', 'accounts');
      this.$router.push('aspsp-selection');
    },
    makePayment() {
      this.$store.dispatch('changeScope', 'payments');
      this.$router.push('/make-payment');
    },
  },
};
</script>
