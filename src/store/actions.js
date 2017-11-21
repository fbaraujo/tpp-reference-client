import { request, post, postJson, accountRequestConsentUri } from './request';
import * as types from './mutation-types';

const aspsp = 'abcbank';

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
    const accountIds = getters.accountIds(aspsp);
    accountIds.forEach(async (accountId) => {
      await dispatch('fetchAccountProduct', accountId);
      await dispatch('fetchAccountBalances', accountId);
    });
  },
  async fetchAccounts({ dispatch, commit }) {
    const response = await request('/accounts', aspsp, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNTS, {
      accounts: response.Data.Account,
      aspsp,
    });
  },
  async fetchAccountProduct({ dispatch, commit }, accountId) {
    const response = await request(`/accounts/${accountId}/product`, aspsp, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNT_PRODUCT, {
      product: response.Data.Product[0],
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
  async fetchAccountBalances({ dispatch, commit }, accountId) {
    const response = await request(`/accounts/${accountId}/balances`, aspsp, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return commit(types.RECEIVE_ACCOUNT_BALANCES, {
      balances: response.Data.Balance,
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
  async validateAuthCode({ dispatch, commit }, payload) {
    const response = await request(`/tpp/authorized?code=${payload.authorisationCode}&authorisationServerId=${payload.authorisationServerId}`, null, types.LOGOUT);
    if (response === types.LOGOUT) {
      return dispatch('deleteSession');
    }
    return true;
  },
};

export default actions;
