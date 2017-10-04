import Vue from 'vue';
import Vuex from 'vuex';
import accounts from './modules/accounts';
import aspspAuthorisationServers from './modules/aspsp-authorisation-servers';
import session from './modules/session';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    accounts,
    aspspAuthorisationServers,
    session,
  },
  actions,
});
