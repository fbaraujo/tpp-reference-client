<template>
  <div id="app">
    <img src="./assets/logo1.png" alt="Sample App Logo">
    <h1 class="xs-mb6">Madhatter</h1>
       <div v-if="isLoggedIn" >
        <button class="ui icon button" @click="home()">
          <i class="home icon"></i>
        </button>
      </div>
      <router-view></router-view>
  </div>
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
