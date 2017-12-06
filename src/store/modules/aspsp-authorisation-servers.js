import Vue from 'vue';
import { request } from '../request';

import {
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
};

const mutations = {
  [ASPSPS_FETCH](state) {
    Vue.set(state, 'pending', true);
  },
  [ASPSPS_SUCCESS](state, payload) {
    Vue.set(state, 'aspsps', payload);
    Vue.set(state, 'pending', false);
  },
  [SELECT_ASPSP](state, aspsp) {
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
    localStorage.setItem('selectedAspsp', JSON.stringify(aspsp));
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
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
