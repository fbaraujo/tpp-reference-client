const { isAvailableBalance, bestMatch } = require('../../../../src/utils/accounts');
const balanceData = require('../BalanceData');

describe('Accounts utility - balance availablity check', () => {
  it('check if account has available balance', () => {
    const balance1 = balanceData.default(22290, 'ClosingBooked', 'Credit');
    expect(isAvailableBalance(balance1)).to.equal(false);

    const balance2 = balanceData.default(22290, 'ClosingAvailable', 'Credit');
    expect(isAvailableBalance(balance2)).to.equal(true);
  });
});

describe('Accounts utility - best match check', () => {
  it('get best match for only one record', () => {
    const balances = [balanceData.default(22290, 'ClosingAvailable', 'Credit')];
    const match = bestMatch(balances);
    expect(match.Amount.Amount).to.equal(22290);
    expect(match.Type).to.equal('ClosingAvailable');
  });

  it('get best match for only two records with same timestamp and differen type record', () => {
    const balances = [
      balanceData.default(12290, 'OpeningAvailable', 'Credit'),
      balanceData.default(22290, 'ClosingAvailable', 'Credit'),
    ];
    const match = bestMatch(balances);
    expect(match.Amount.Amount).to.equal(22290);
    expect(match.Type).to.equal('ClosingAvailable');
  });

  it('get best match for only two records with same type and differen timestamp', () => {
    const balances = [
      balanceData.default(12290, 'OpeningAvailable', 'Credit', '2017-04-05T10:43:07+00:00'),
      balanceData.default(32290, 'OpeningAvailable', 'Credit', '2017-05-05T10:43:07+00:00'),
    ];
    const match = bestMatch(balances);
    expect(match.Amount.Amount).to.equal(32290);
    expect(match.Type).to.equal('OpeningAvailable');
  });

  it('get best match for multiple records with differen type and timestamp', () => {
    const balances = [
      balanceData.default(12290, 'ClosingAvailable', 'Credit', '2017-04-05T10:43:07+00:00'),
      balanceData.default(42290, 'InterimAvailable', 'Credit', '2017-03-05T10:43:07+00:00'),
      balanceData.default(22290, 'ForwardAvailable', 'Credit', '2017-05-05T10:43:07+00:00'),
      balanceData.default(32290, 'InterimAvailable', 'Credit', '2017-05-05T10:43:07+00:00'),
      balanceData.default(92290, 'ClosingAvailable', 'Credit', '2017-04-05T10:43:07+00:00'),
      balanceData.default(82290, 'OpeningAvailable', 'Credit', '2017-03-05T10:43:07+00:00'),
    ];
    const match = bestMatch(balances);
    expect(match.Amount.Amount).to.equal(32290);
    expect(match.Type).to.equal('InterimAvailable');
  });
});

