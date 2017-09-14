import Vue from 'vue';
import Router from 'vue-router';
import Accounts from '@/components/Accounts';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ],
});
