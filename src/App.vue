<template>
  <!-- <div class="col-container2">
    <img src="./assets/M_logo.png" class="xs-mt5" alt="Sample logo">
          <p class="xs-mb4 EEX-px">Moinda</p>
      <router-view></router-view>
  </div> -->
    <router-view></router-view>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  methods: {
    home() {
      this.$router.push('/activity-selection');
    },
  },
};
</script>
