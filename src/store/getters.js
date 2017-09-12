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
  accountIds: (state, getter) => (aspspKey) => {
    const aspspAccounts = getter.accounts(aspspKey);
    const accountIds = [];
    aspspAccounts.forEach(account => accountIds.push(account.AccountId));
    return accountIds;
  },
};

export default getters;
