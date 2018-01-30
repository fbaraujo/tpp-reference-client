import { request, post, postJson, accountRequestConsentUri, revokeAccountConsentUri, tppAuthCodeUri } from './request';
import { getSelectedAspsp } from './selected-aspsp';
import * as types from './mutation-types';

const actions = {
  async createSession({ commit }, credentials) {
    commit(types.LOGIN); // show spinner
    // set body string to emulate x-www-form-urlencoded form
    const body = `u=${credentials.u}&p=${credentials.p}`;
    const result = await post('/login', body, types.LOGIN_INVALID_CREDENTIALS);
    if (result === types.LOGIN_INVALID_CREDENTIALS) {
      return commit(types.LOGIN_INVALID_CREDENTIALS);
    } else if (result) {
      localStorage.setItem('session_id', result.sid);
      return commit(types.LOGIN_SUCCESS);
    }
    return commit(types.LOGIN_ERROR);
  },
  async accountRequestAuthoriseConsent(options, data) {
    const uri = accountRequestConsentUri;
    const { aspsp } = data;
    const authorisationServerId = aspsp.id;
    const body = { authorisationServerId };
    const response = await postJson(uri, authorisationServerId, body, 'BAD_REQUEST');
    if (response.uri) {
      return response.uri;
    }
    return null;
  },
  async revokeAccountsConsent({ commit }, authorisationServerId) {
    const uri = revokeAccountConsentUri;
    const response = await postJson(uri, authorisationServerId, {}, 'BAD_REQUEST');
    if (response !== 'BAD_REQUEST') {
      commit(types.REVOKE_ACCOUNTS_CONSENT, authorisationServerId);
    }
  },
  async deleteSession({ commit }) {
    commit(types.CLEAR_CONFIRMED_PAYMENT);
    commit(types.PAYMENT_SUBMISSION_RESET);
    await request('/logout');
    localStorage.removeItem('session_id');
    return commit(types.LOGOUT);
  },
  async populateAccounts({ dispatch, getters }) {
    await dispatch('fetchAccounts');
    const authServerId = getSelectedAspsp().id;
    const accountIds = getters.accountIds(authServerId);
    accountIds.forEach(async (accountId) => {
      await dispatch('fetchAccountProduct', accountId);
      await dispatch('fetchAccountBalances', accountId);
    });
  },
  async fetchAccounts({ dispatch, commit }) {
    const authServerId = getSelectedAspsp().id;

    const response = await request('/accounts', types.LOGOUT, authServerId);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    if (response) {
      return commit(types.RECEIVE_ACCOUNTS, {
        accounts: response.Data.Account,
        aspsp: authServerId,
      });
    }
    return null;
  },
  async fetchAccountProduct({ dispatch, commit }, accountId) {
    const authServerId = getSelectedAspsp().id;

    const response = await request(`/accounts/${accountId}/product`, types.LOGOUT, authServerId);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    if (response) {
      return commit(types.RECEIVE_ACCOUNT_PRODUCT, {
        product: response.Data.Product[0],
        aspspAccountId: `${authServerId}-${accountId}`,
      });
    }
    return null;
  },
  async fetchAccountBalances({ dispatch, commit }, accountId) {
    const authServerId = getSelectedAspsp().id;

    const response = await request(`/accounts/${accountId}/balances`, types.LOGOUT, authServerId);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    if (response) {
      return commit(types.RECEIVE_ACCOUNT_BALANCES, {
        balances: response.Data.Balance,
        aspspAccountId: `${authServerId}-${accountId}`,
      });
    }
    return null;
  },
  async validateAuthCode({ dispatch }, state) {
    const response = await postJson(
      tppAuthCodeUri, state.authorisationServerId,
      state, types.LOGOUT,
    );

    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return true;
  },
};

export default actions;
