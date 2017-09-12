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
  accounts: state => (aspspKey) => {
    const data = state.accountsByAspsp[aspspKey];
    return (data && data.accounts) || [];
  },
  product: state => (aspspAccountId) => {
    const data = state.accountProductByAccountId[aspspAccountId];
    return (data && data.product) || {};
  },
  balances: state => (aspspAccountId) => {
    const data = state.accountBalancesByAccountId[aspspAccountId];
    return (data && data.balances) || [];
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
      state.accountProductByAccountId, payload.aspspAccountId,
      { product: payload.product },
    );
  },
  [RECEIVE_ACCOUNT_BALANCES](state, payload) {
    Vue.set(
      state.accountBalancesByAccountId, payload.aspspAccountId,
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
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
  async fetchAccountBalances({ commit }, accountId) {
    const json = await request(`/accounts/${accountId}/balances`, aspsp);
    return commit(RECEIVE_ACCOUNT_BALANCES, {
      balances: json.Data.Balance,
      aspspAccountId: `${aspsp}-${accountId}`,
    });
  },
};

export default new Vuex.Store({
  state: initialState,
  getters,
  mutations,
  actions,
});
