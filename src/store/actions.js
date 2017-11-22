import { request, post, postJson, accountRequestConsentUri } from './request';
import * as types from './mutation-types';

const getSelectedAspsp = () => {
  if (localStorage.getItem('selectedAspsp')) {
    return JSON.parse(localStorage.getItem('selectedAspsp'));
  }
  throw Error('no selected ASPSP in local storage');
};

const actions = {
  async createSession({ commit }, credentials) {
    commit(types.LOGIN); // show spinner
    // set body string to emulate x-www-form-urlencoded form
    const body = `u=${credentials.u}&p=${credentials.p}`;
    const result = await post('/login', body, types.LOGIN_INVALID_CREDENTIALS);
    if (result === types.LOGIN_INVALID_CREDENTIALS) {
      return commit(types.LOGIN_INVALID_CREDENTIALS);
    } else if (result) {
      localStorage.setItem('token', result.sid);
      return commit(types.LOGIN_SUCCESS);
    }
    return commit(types.LOGIN_ERROR);
  },
  accountRequestAuthoriseConsent(options, data) {
    const aspspId = data.orgId;
    const body = { authorisationServerId: data.id };
    postJson(accountRequestConsentUri, aspspId, body, types.LOGOUT);
  },
  deleteSession({ commit }) {
    localStorage.removeItem('token');
    request('/logout');
    return commit(types.LOGOUT);
  },
  async populateAccounts({ dispatch, getters }) {
    await dispatch('fetchAccounts');
    const authServerId = getSelectedAspsp().id;
    // const fapiFinancialId = getSelectedAspsp().orgId;
    const accountIds = getters.accountIds(authServerId);
    accountIds.forEach(async (accountId) => {
      await dispatch('fetchAccountProduct', accountId);
      await dispatch('fetchAccountBalances', accountId);
    });
  },
  async fetchAccounts({ dispatch, commit }) {
    const fapiFinancialId = getSelectedAspsp().orgId;
    const authServerId = getSelectedAspsp().id;

    const response = await request('/accounts', fapiFinancialId, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNTS, {
      accounts: response.Data.Account,
      aspsp: authServerId,
    });
  },
  async fetchAccountProduct({ dispatch, commit }, accountId) {
    const fapiFinancialId = getSelectedAspsp().orgId;
    const authServerId = getSelectedAspsp().id;

    const response = await request(`/accounts/${accountId}/product`, fapiFinancialId, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNT_PRODUCT, {
      product: response.Data.Product[0],
      aspspAccountId: `${authServerId}-${accountId}`,
    });
  },
  async fetchAccountBalances({ dispatch, commit }, accountId) {
    const fapiFinancialId = getSelectedAspsp().orgId;
    const authServerId = getSelectedAspsp().id;

    const response = await request(`/accounts/${accountId}/balances`, fapiFinancialId, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNT_BALANCES, {
      balances: response.Data.Balance,
      aspspAccountId: `${authServerId}-${accountId}`,
    });
  },
  async validateAuthCode({ dispatch }, payload) {
    const response = await request(`/tpp/authorized?code=${payload.authorisationCode}&authorisationServerId=${payload.authorisationServerId}`, null, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return true;
  },
};

export default actions;
