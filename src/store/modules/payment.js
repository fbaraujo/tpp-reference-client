import Vue from 'vue';
import {
  CONFIRMED_PAYMENT, LOGOUT, RECEIVE_PAYMENT_INTERACTION_ID,
  CLEAR_CONFIRMED_PAYMENT,
  PAYMENT_SUBMISSION_PENDING, PAYMENT_SUBMISSION_SUBMITTED,
  PAYMENT_SUBMISSION_FAILED, PAYMENT_SUBMISSION_RESET } from '../mutation-types';
import { postJson, paymentConsentUri, postPaymentSubmission } from '../request';
import { getSelectedAspsp } from '../selected-aspsp';

const CURRENCY = 'GBP';

const initialState = {
  confirmedPayment: {},
  paymentInteractionId: {},
  status: null,
};

const getters = {
  confirmedPayment: state =>
    state.confirmedPayment,
  paymentInteractionId: state =>
    state.paymentInteractionId,
  paymentSubmissionPending: state =>
    state.status === PAYMENT_SUBMISSION_PENDING,
  paymentSubmissionSubmitted: state =>
    state.status === PAYMENT_SUBMISSION_SUBMITTED,
  paymentSubmissionFailed: state =>
    state.status === PAYMENT_SUBMISSION_FAILED,
};

const mutations = {
  [CONFIRMED_PAYMENT](state, payment) {
    Vue.set(state, 'confirmedPayment', payment);
  },
  [CLEAR_CONFIRMED_PAYMENT](state) {
    Vue.set(state, 'confirmedPayment', {});
  },
  [RECEIVE_PAYMENT_INTERACTION_ID](state, interactionId) {
    Vue.set(state, 'paymentInteractionId', interactionId);
  },
  [PAYMENT_SUBMISSION_PENDING](state) {
    Vue.set(state, 'status', PAYMENT_SUBMISSION_PENDING);
  },
  [PAYMENT_SUBMISSION_SUBMITTED](state) {
    Vue.set(state, 'status', PAYMENT_SUBMISSION_SUBMITTED);
  },
  [PAYMENT_SUBMISSION_FAILED](state) {
    Vue.set(state, 'status', PAYMENT_SUBMISSION_FAILED);
  },
  [PAYMENT_SUBMISSION_RESET](state) {
    Vue.set(state, 'status', null);
  },
};

const actions = {
  makePayment({ commit }, payment) {
    return commit(CONFIRMED_PAYMENT, payment);
  },
  setPaymentInteractionId({ commit }, interactionId) {
    return commit(RECEIVE_PAYMENT_INTERACTION_ID, interactionId);
  },
  async paymentRequestAuthoriseConsent({ commit, dispatch }, data) {
    const { aspsp } = data;
    const { confirmedPayment } = data;
    const authServerId = aspsp.id;
    const formattedAmount = parseFloat((confirmedPayment.amount * 100) / 100).toFixed(2);
    const body = {
      authorisationServerId: aspsp.id,
      InstructedAmount: {
        Amount: formattedAmount,
        Currency: CURRENCY,
      },
      CreditorAccount: {
        SchemeName: 'SortCodeAccountNumber',
        Identification: `${confirmedPayment.sortCode}${confirmedPayment.accountNumber}`,
        Name: confirmedPayment.name,
      },
    };
    commit(CLEAR_CONFIRMED_PAYMENT);
    const response = await postJson(paymentConsentUri, authServerId, body, LOGOUT);
    if (response === LOGOUT) {
      return dispatch('deleteSession');
    }
    if (response.uri) {
      return response.uri;
    }
    return null;
  },
  async paymentSubmission({ commit, dispatch }, interactionId) {
    const authServerId = getSelectedAspsp().id;
    commit(PAYMENT_SUBMISSION_PENDING);
    const response = await postPaymentSubmission('/payment-submissions', LOGOUT, authServerId, interactionId);
    if (response === LOGOUT) {
      return dispatch('deleteSession');
    }
    if (response === true) {
      commit(PAYMENT_SUBMISSION_SUBMITTED);
      return true;
    }
    commit(PAYMENT_SUBMISSION_FAILED);
    return null;
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
