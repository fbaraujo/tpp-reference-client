import Vue from 'vue';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_INVALID_CREDENTIALS,
  LOGOUT,
} from '../mutation-types';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  invalidCredentials: false,
  pending: false,
};

const getters = {
  isLoggedIn: state => () => { // eslint-disable-line
    return state.isLoggedIn;
  },
  invalidCredentials: state => () => { // eslint-disable-line
    return state.invalidCredentials;
  },
};

const mutations = {
  [LOGIN](state) {
    Vue.set(state, 'pending', true);
  },
  [LOGIN_SUCCESS](state) {
    Vue.set(state, 'invalidCredentials', false);
    Vue.set(state, 'isLoggedIn', true);
    Vue.set(state, 'pending', false);
  },
  [LOGIN_INVALID_CREDENTIALS](state) {
    Vue.set(state, 'invalidCredentials', true);
    Vue.set(state, 'pending', false);
  },
  [LOGOUT](state) {
    Vue.set(state, 'isLoggedIn', false);
  },
};

export default {
  state: initialState,
  getters,
  mutations,
};
