<template>
  <div class="col-container2">
    <img src="./assets/M_logo.png" class="xs-mt5" alt="Sample logo">
          <p class="xs-mb4 EEX-px">Moinda</p>
       <!--<div v-if="isLoggedIn" >
        <button class="ui icon button" @click="home()">
          <i class="home icon"></i>
        </button>
      </div>-->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn();
    },
  },
  methods: {
    home() {
      this.$router.push('/activity-selection');
    },
  },
};
</script>
