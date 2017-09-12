import Vue from 'vue';

import {
  RECEIVE_ACCOUNTS,
  RECEIVE_ACCOUNT_PRODUCT,
  RECEIVE_ACCOUNT_BALANCES,
} from '../mutation-types';

const initialState = {
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

export default {
  state: initialState,
  getters,
  mutations,
};
