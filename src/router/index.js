import Vue from 'vue';
import Router from 'vue-router';
import ActivitySelection from '@/components/ActivitySelection';
import MakePayment from '@/components/MakePayment';
import PaymentSubmitted from '@/components/PaymentSubmitted';
import Accounts from '@/components/Accounts';
import AspspSelection from '@/components/AspspSelection';
import Login from '@/components/Login';
import Redirect from '@/components/Redirect';
import RedirectBack from '@/components/RedirectBack';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/activity-selection',
      name: 'ActivitySelection',
      component: ActivitySelection,
    },
    {
      path: '/make-payment',
      name: 'MakePayment',
      component: MakePayment,
    },
    {
      path: '/payment-submitted',
      name: 'PaymentSubmitted',
      component: PaymentSubmitted,
    },
    {
      path: '/accounts',
      name: 'Accounts',
      component: Accounts,
    },
    {
      path: '/aspsp-selection',
      name: 'AspspSelection',
      component: AspspSelection,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect,
    },
    {
      path: '/tpp/authorized', // to be changed to be in line with other client app urls
      name: 'RedirectBack',
      component: RedirectBack,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const loggedIn = router.app.$store.getters.isLoggedIn;
  if (!loggedIn && to.path !== '/') {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
