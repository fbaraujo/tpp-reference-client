import Vue from 'vue';
import Vuex from 'vuex';
import scope from './modules/scope';
import accounts from './modules/accounts';
import aspspAuthorisationServers from './modules/aspsp-authorisation-servers';
import payment from './modules/payment';
import session from './modules/session';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    scope,
    accounts,
    aspspAuthorisationServers,
    payment,
    session,
  },
  actions,
});
