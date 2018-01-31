import Vue from 'vue';
import { postJson, request, revokeAccountConsentUri } from '../request';

import {
  ACCOUNTS_CONSENT_CHANGE,
  ASPSPS_FETCH,
  ASPSPS_SUCCESS,
  LOGOUT,
  SELECT_ASPSP,
} from '../mutation-types';

const initialState = {
  aspsps: [],
  selectedAspsp: null,
  pending: false,
};

const getters = {
  aspsps: state => () => { // eslint-disable-line
    return state.aspsps;
  },
  selectedAspsp: state => () => { // eslint-disable-line
    return state.selectedAspsp;
  },
  aspsp: state => (authorisationServerId) => { // eslint-disable-line
    return state.aspsps.find(aspsp => aspsp.id === authorisationServerId);
  },
};

const mutations = {
  [ASPSPS_FETCH](state) {
    Vue.set(state, 'pending', true);
  },
  [ASPSPS_SUCCESS](state, payload) {
    Vue.set(state, 'aspsps', payload);
    Vue.set(state, 'pending', false);
  },
  [ACCOUNTS_CONSENT_CHANGE](state, { authorisationServerId, accountsConsentGranted }) {
    if (state.selectedAspsp.id === authorisationServerId) {
      const updatedAspsp = Object.assign(state.selectedAspsp, { accountsConsentGranted });
      localStorage.setItem('selectedAspsp', JSON.stringify(updatedAspsp));
      Vue.set(state, 'selectedAspsp', updatedAspsp);
    }
    state.aspsps.forEach((aspsp, index) => {
      if (aspsp.id === authorisationServerId) {
        const updatedAspsp = Object.assign(aspsp, { accountsConsentGranted });
        Vue.set(state.aspsps, index, updatedAspsp);
      }
    });
  },
  [SELECT_ASPSP](state, aspsp) {
    localStorage.setItem('selectedAspsp', JSON.stringify(aspsp));
    Vue.set(state, 'selectedAspsp', aspsp);
  },
};

const sortByName = (list) => {
  list.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name > b.name) {
      return -1;
    }
    return 0;
  });
  return list;
};

const actions = {
  async fetchAspsps({ commit, dispatch }) {
    commit(ASPSPS_FETCH);
    const response = await request('/account-payment-service-provider-authorisation-servers', LOGOUT);
    if (response === LOGOUT) {
      return dispatch('deleteSession');
    } else if (response) {
      const list = sortByName(response);
      return commit(ASPSPS_SUCCESS, list);
    }
    return dispatch('deleteSession');
  },
  selectAspsp({ commit }, aspsp) {
    return commit(SELECT_ASPSP, aspsp);
  },
  refreshSelectedAspsp({ commit }) {
    if (localStorage.getItem('selectedAspsp')) {
      let localAspsp;
      try {
        localAspsp = JSON.parse(localStorage.getItem('selectedAspsp'));
      } catch (e) {
        localStorage.removeItem('selectedAspsp');
        localAspsp = null;
      } finally {
        commit(SELECT_ASPSP, localAspsp);
      }
    }
  },
  accountsConsentGranted({ commit }, authorisationServerId) {
    commit(ACCOUNTS_CONSENT_CHANGE, { authorisationServerId, accountsConsentGranted: true });
  },
  async revokeAccountsConsent({ commit }, authorisationServerId) {
    const uri = revokeAccountConsentUri;
    const response = await postJson(uri, authorisationServerId, {}, 'BAD_REQUEST');
    if (response !== 'BAD_REQUEST') {
      commit(ACCOUNTS_CONSENT_CHANGE, { authorisationServerId, accountsConsentGranted: false });
    }
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
