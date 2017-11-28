<template>
  <div id="app">
    <main class="ui container">
      <div class="ui container">
        <img src="./assets/logo.png" alt="Sample App Logo">
      </div>
      <div v-if="isLoggedIn" >
        <button class="ui icon button" @click="home()">
          <i class="home icon"></i>
        </button>
      </div>
      <div class="ui divider"></div>
      <router-view></router-view>
    </main>
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
