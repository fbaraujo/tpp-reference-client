const groupby = require('lodash.groupby');
const sortby = require('lodash.sortby');

const isAvailableBalance = (balance) => {
  switch (balance.Type) {
    case 'ClosingAvailable':
    case 'InterimAvailable':
    case 'OpeningAvailable':
    case 'ForwardAvailable':
      return true;
    default:
      return false;
  }
};

const sortDatetimeDescending = balances => sortby(balances, b => b.DateTime).reverse();

const bestMatchWithoutDateTime = (list) => {
  const byType = groupby(list, b => b.Type);
  if (byType.ClosingAvailable) return byType.ClosingAvailable[0];
  if (byType.InterimAvailable) return byType.InterimAvailable[0];
  if (byType.OpeningAvailable) return byType.OpeningAvailable[0];
  if (byType.ForwardAvailable) return byType.ForwardAvailable[0];
  return null;
};

const bestMatch = (available) => {
  const orderedByDate = sortDatetimeDescending(available);
  const latestDateTime = orderedByDate[0].DateTime;
  const byDatetime = groupby(available, b => b.DateTime);
  const recent = byDatetime[latestDateTime];
  if (recent.length > 1) {
    return bestMatchWithoutDateTime(recent);
  }
  return recent[0];
};

export {
  isAvailableBalance,
  bestMatch,
};
