<template>
  <aside class="col">
    <div>
      <a @click="activitySelection()">
        <img src="../assets/dashboard_icon.png" style="vertical-align:middle" class="xs-mr1">
        Dashboard
      </a>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'side-navigation',
  methods: {
    activitySelection() {
      this.$router.push('activity-selection');
    },
  },
};
</script>
