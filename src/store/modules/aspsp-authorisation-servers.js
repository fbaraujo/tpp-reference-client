import Vue from 'vue';
import { request } from '../request';

import {
  ASPSPS_FETCH,
  ASPSPS_SUCCESS,
  LOGOUT,
} from '../mutation-types';

const initialState = {
  aspsps: [],
  pending: false,
};

const getters = {
  aspsps: state => () => { // eslint-disable-line
    return state.aspsps;
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
    const response = await request('/account-payment-service-provider-authorisation-servers', null, LOGOUT);
    if (response === LOGOUT) {
      return dispatch('deleteSession');
    } else if (response) {
      const list = sortByName(response);
      return commit(ASPSPS_SUCCESS, list);
    }
    return dispatch('deleteSession');
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
