import Vue from 'vue';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../mutation-types';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
};

const getters = {
  isLoggedIn: state => () => { // eslint-disable-line
    return state.isLoggedIn;
  },
};

const mutations = {
  [LOGIN](state) {
    Vue.set(state, 'pending', true);
  },
  [LOGIN_SUCCESS](state) {
    Vue.set(state, 'isLoggedIn', true);
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
