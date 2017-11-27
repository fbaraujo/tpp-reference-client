<template>
  <div id="activity-selection">
    <div class="ui container">
      <h1 class="ui aligned header">Select activity</h1>
      <div class="ui hidden divider"></div>
      <div class="ui divided items">
        <div class="item">
          <button name="view-balances" class="ui large submit button">
            View Balances
          </button>
        </div>
        <div class="item">
          <button name="view-balances" class="ui large submit button">
            Make payments
          </button>
        </div>
      </div>
      <logout></logout>
    </div>
  </div>
</template>

<script>
import Logout from './Logout';

export default {
  name: 'activity-selection',
  components: { Logout },
  computed: { },
};
</script>
