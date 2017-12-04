import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import RedirectBack from '@/components/RedirectBack';

describe('RedirectBack.vue with redirection params', () => {
  let vm;

  beforeEach(() => {
    const Construct = Vue.extend(RedirectBack);
    vm = new Construct({ store, router });
  });

  const initRouteState = (code, state) => {
    if (code) {
      vm.$route.query.code = code;
    }
    if (state) {
      vm.$route.query.state = state;
    }
    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    vm.$data.visibleRetry = true;
  };

  const assertContentIncludes = async (text) => {
    await Vue.nextTick();
    expect(vm.$el.textContent).to.include(text);
  };

  it('renders ASPSP name and redirect to balance page', () => {
    vm.$store.commit('LOGIN_SUCCESS');
    vm.$mount();
    expect(vm.$el.textContent).to.include('Validating request');
  });

  it('renders Invalid request', async () => {
    initRouteState('foo');
    await assertContentIncludes('Invalid request');
  });

  it('renders Invalid state format message', async () => {
    initRouteState('foo', 'bar');
    await assertContentIncludes('Request invalid. Your request has been cancelled and you will be redirected');
  });

  it('renders Invalid session message', async () => {
    initRouteState('foo', 'eyJhdXRob3Jpc2F0aW9uU2VydmVySWQiOiIxIiwgInNlc3Npb25JZCI6IjEifQ==');
    await assertContentIncludes('Invalid session');
  });

  it('renders Processing... message', async () => {
    localStorage.setItem('token', 1);
    initRouteState('foo', 'eyJhdXRob3Jpc2F0aW9uU2VydmVySWQiOiIxIiwgInNlc3Npb25JZCI6IjEifQ==');
    await assertContentIncludes('Processing...');
  });

  it('sets the correct default data', () => {
    expect(typeof RedirectBack.data).to.equal('function');
    const defaultData = RedirectBack.data();
    expect(defaultData.message).to.equal('');
    expect(defaultData.visibleRetry).to.equal(false);
  });
});
