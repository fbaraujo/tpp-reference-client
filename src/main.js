// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
