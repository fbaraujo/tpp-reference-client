<template>
  <div class="account card">
    <div class="content">
      <div class="meta">
        {{ account.Nickname }}
        {{ ' - '}}
        {{ account.Account.Name }}
      </div>
      <div className="description">
        {{ account.Servicer.Identification.replace('SC', '')}}
        {{account.Account.Identification}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  props: ['account', 'product', 'balances'],
  data() {
    return { };
  },
};
</script>

<style scoped>
.account.card {
  width: 390px;
}
</style>
