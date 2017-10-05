<template>
  <div class="aspsp-select item">
    <div class="ui hidden divider"></div>
    <div class="ui tiny image">
      <img src="">
    </div>
    <div class="middle aligned content">
      <div class="header">
        <a class="select-aspsp" v-on:click="selectAspsp">{{ name }}</a>
      </div>
    </div>
    <div class="ui hidden divider"></div>
  </div>
</template>

<script>
export default {
  name: 'aspsp-select',
  props: ['aspsp'],
  computed: {
    name() {
      return this.aspsp.name;
    },
  },
  methods: {
    selectAspsp() {
      this.$router.push('accounts');
    },
  },
};
</script>

<style scoped>
.aspsp-select.item {
  width: 390px;
}
</style>
