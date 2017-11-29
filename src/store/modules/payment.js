import Vue from 'vue';
import { MAKE_PAYMENT } from '../mutation-types';

const initialState = {
  payment: {},
};

const mutations = {
  [MAKE_PAYMENT](state, payment) {
    Vue.set(state, 'payment', payment);
  },
};

const actions = {
  makePayment({ commit }, payment) {
    return commit(MAKE_PAYMENT, payment);
  },
};

export default {
  state: initialState,
  mutations,
  actions,
};
