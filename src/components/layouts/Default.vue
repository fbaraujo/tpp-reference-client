<template>
  <div class="col-container">
    <header>
      <a href="./ActivitySelection" @click="activitySelection()"><img src="../../assets/M_smlp.png"></a>
      <a href="./Login"><img src="../../assets/Exit.png" class="logout" @click="login()"> </a>
    </header>
    <side-navigation/>
    <slot/>
  </div>
</template>

<script>
import SideNavigation from '../SideNavigation';

export default {
  name: 'layout-default',
  components: { SideNavigation },
  methods: {
    activitySelection() {
      this.$router.push('activity-selection');
    },
  },
};
</script>
