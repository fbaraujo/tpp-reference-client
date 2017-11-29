import Vue from 'vue';
import { MAKE_PAYMENT } from '../mutation-types';

const initialState = {
  confirmedPayment: {},
};

const getters = {
  confirmedPayment: state => () => { // eslint-disable-line
    return state.confirmedPayment;
  },
};

const mutations = {
  [MAKE_PAYMENT](state, payment) {
    Vue.set(state, 'confirmedPayment', payment);
  },
};

const actions = {
  makePayment({ commit }, payment) {
    return commit(MAKE_PAYMENT, payment);
  },
  async paymentRequestAuthoriseConsent() {
    return null;
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
