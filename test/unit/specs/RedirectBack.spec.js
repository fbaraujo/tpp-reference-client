import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import RedirectBack from '@/components/RedirectBack';

describe('RedirectBack.vue with redirection params', () => {
  it('renders ASPSP name and redirect to balance page', () => {
    const Construct = Vue.extend(RedirectBack);
    const vm = new Construct({ store });

    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    expect(vm.$el.textContent).to.include('Validating request');
  });

  it('renders Invalid request', (done) => {
    const Construct = Vue.extend(RedirectBack);
    const vm = new Construct({ store, router });

    vm.$route.query.code = 'foo';

    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    vm.$data.visibleRetry = true;
    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.include('Invalid request');
      done();
    });
  });

  it('renders Invalid state format message', (done) => {
    const Construct = Vue.extend(RedirectBack);
    const vm = new Construct({ store, router });

    vm.$route.query.code = 'foo';
    vm.$route.query.state = 'bar';

    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    vm.$data.visibleRetry = true;
    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.include('Request invalid. Your request has been cancelled and you will be redirected');
      done();
    });
  });

  it('renders Invalid session message', (done) => {
    const Construct = Vue.extend(RedirectBack);
    const vm = new Construct({ store, router });

    vm.$route.query.code = 'foo';
    vm.$route.query.state = 'eyJhdXRob3Jpc2F0aW9uU2VydmVySWQiOiIxIiwgInNlc3Npb25JZCI6IjEifQ==';

    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    vm.$data.visibleRetry = true;
    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.include('Invalid session');
      done();
    });
  });

  it('renders Processing... message', (done) => {
    const Construct = Vue.extend(RedirectBack);
    const vm = new Construct({ store, router });

    vm.$route.query.code = 'foo';
    vm.$route.query.state = 'eyJhdXRob3Jpc2F0aW9uU2VydmVySWQiOiIxIiwgInNlc3Npb25JZCI6IjEifQ==';

    vm.$store.commit('LOGIN_SUCCESS');
    localStorage.setItem('token', 1);

    vm.$mount();
    vm.$data.visibleRetry = true;
    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.include('Processing...');
      done();
    });
  });

  it('sets the correct default data', () => {
    expect(typeof RedirectBack.data).to.equal('function');
    const defaultData = RedirectBack.data();
    expect(defaultData.message).to.equal('');
    expect(defaultData.visibleRetry).to.equal(false);
  });
});
