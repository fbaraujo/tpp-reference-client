<template>
  <div id="app">
    <main class="ui container">
      <div class="ui container">
        <img src="./assets/logo.png" alt="Sample App Logo">
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>
