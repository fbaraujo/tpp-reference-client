import Vue from 'vue';
import Vuex from 'vuex';
import request from './request';

Vue.use(Vuex);

const REQUEST_ACCOUNTS = 'REQUEST_ACCOUNTS';
const RECEIVE_ACCOUNTS = 'RECEIVE_ACCOUNTS';
const RECEIVE_ACCOUNT_PRODUCT = 'RECEIVE_ACCOUNT_PRODUCT';
const RECEIVE_ACCOUNT_BALANCES = 'RECEIVE_ACCOUNT_BALANCE';

const aspsp = 'abcbank';

const initialState = {
  selectedAspsp: aspsp,
  accountsByAspsp: {},
  accountProductByAccountId: {},
  accountBalancesByAccountId: {},
};

const getters = {
  // eslint-disable-next-line
  accounts: (state, getters) => (aspspKey) => {
    const { accounts } = state.accountsByAspsp[aspspKey];
    return accounts;
  },
  // eslint-disable-next-line
  product: (state, getters) => (accountId) => {
    const { product } = state.accountProductByAccountId[accountId];
    return product;
  },
  accountIds: (state, { accounts }) => (aspspKey) => {
    const aspspAccounts = accounts(aspspKey);
    const accountIds = [];
    aspspAccounts.forEach(account => accountIds.push(account.AccountId));
    return accountIds;
  },
};

const mutations = {
  [REQUEST_ACCOUNTS](state, payload) {
    Vue.set(
      state.accountsByAspsp, payload.aspsp,
      { accounts: [], isFetching: false },
    );
  },
  [RECEIVE_ACCOUNTS](state, payload) {
    Vue.set(
      state.accountsByAspsp, payload.aspsp,
      { accounts: payload.accounts, isFetching: false },
    );
  },
  [RECEIVE_ACCOUNT_PRODUCT](state, payload) {
    Vue.set(
      state.accountProductByAccountId, payload.aspsp,
      { product: payload.product },
    );
  },
  [RECEIVE_ACCOUNT_BALANCES](state, payload) {
    Vue.set(
      state.accountBalancesByAccountId, payload.aspsp,
      { balances: payload.balances },
    );
  },
};

const actions = {
  async shouldFetchAccounts(context) {
    const accounts = context.state.accountsByAspsp[aspsp];
    let fetch = null;
    if (!accounts) {
      fetch = true;
    } else if (accounts.isFetching) {
      fetch = true;
    } else {
      fetch = false;
    }
    return fetch;
  },
  async fetchAccounts({ commit }) {
    const json = await request('/accounts', aspsp);
    return commit(RECEIVE_ACCOUNTS, {
      accounts: json.Data,
      aspsp,
    });
  },
  async fetchAccountProduct({ commit }, accountId) {
    const json = await request(`/accounts/${accountId}/product`, aspsp);
    commit(RECEIVE_ACCOUNT_PRODUCT, {
      product: json.Data.Product[0],
      aspsp,
    });
  },
  async fetchAccountBalances({ commit }, accountId) {
    const json = await request(`/accounts/${accountId}/balances`, aspsp);
    return commit(RECEIVE_ACCOUNT_BALANCES, {
      balances: json.Data.Balance,
      aspsp,
    });
  },
};

export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
});
