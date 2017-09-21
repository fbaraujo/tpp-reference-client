import { request, post } from './request';
import * as types from './mutation-types';

const aspsp = 'abcbank';

const actions = {
  async createSession({ commit }, credentials) {
    commit(types.LOGIN); // show spinner
    // set body string to emulate x-www-form-urlencoded form
    const body = `u=${credentials.u}&p=${credentials.p}`;
    const json = await post('/login', body);

    localStorage.setItem('token', json.sid);
    return commit(types.LOGIN_SUCCESS);
  },
  deleteSession({ commit }) {
    localStorage.removeItem('token');
    request('logout');
    return commit(types.LOGOUT);
  },
  async fetchAccounts({ commit }) {
    const json = await request('/accounts', aspsp);
    return commit(types.RECEIVE_ACCOUNTS, {
      accounts: json.Data,
      aspsp,
    });
  },
  async fetchAccountProduct({ commit }, accountId) {
    const json = await request(`/accounts/${accountId}/product`, aspsp);
    commit(types.RECEIVE_ACCOUNT_PRODUCT, {
      product: json.Data.Product[0],
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
  async fetchAccountBalances({ commit }, accountId) {
    const json = await request(`/accounts/${accountId}/balances`, aspsp);
    return commit(types.RECEIVE_ACCOUNT_BALANCES, {
      balances: json.Data.Balance,
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
};

export default actions;
