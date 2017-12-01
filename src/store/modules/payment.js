import Vue from 'vue';
import { MAKE_PAYMENT, LOGOUT } from '../mutation-types';
import { postJson, paymentConsentUri } from '../request';

const CURRENCY = 'GBP';

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
  async paymentRequestAuthoriseConsent(context, data) {
    const aspsp = data.aspsp;
    const confirmedPayment = data.confirmedPayment;
    const aspspId = aspsp.orgId;
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
    const response = await postJson(paymentConsentUri, aspspId, body, LOGOUT);
    if (response.uri) {
      return response.uri;
    }
    return null;
  },
};

export default {
  state: initialState,
  getters,
  mutations,
  actions,
};
