import Vue from 'vue';
import BalanceAvailable from '@/components/BalanceAvailable';

const trim = s => (s || '').replace(/^\s+|\s+$/g, '');

const balanceText = (balances) => {
  const Constructor = Vue.extend(BalanceAvailable);
  const vm = new Constructor({ propsData: { balances } }).$mount();
  if (vm.$el.childElementCount) {
    return trim(vm.$el.querySelector('.amount').textContent);
  }
  return '';
};

const singleBalance = (amount, type) => balanceText([
  {
    Amount: {
      Amount: amount,
      Currency: 'GBP',
    },
    CreditDebitIndicator: 'Credit',
    Type: type,
    DateTime: '2017-04-05T10:43:07+00:00',
  },
]);

const doubleBalance = (amount, type, datetime, amount2, type2, datetime2) => balanceText([
  {
    Amount: {
      Amount: amount,
      Currency: 'GBP',
    },
    CreditDebitIndicator: 'Credit',
    Type: type,
    DateTime: datetime,
  },
  {
    Amount: {
      Amount: amount2,
      Currency: 'GBP',
    },
    CreditDebitIndicator: 'Credit',
    Type: type2,
    DateTime: datetime2,
  },
]);

describe('BalanceAvailable.vue with no available balance', () => {
  it('renders blank', () => expect(balanceText([])).to.equal(''));
});

describe('BalanceAvailable.vue with single balance that is not a available balance', () => {
  it('renders blank', () => {
    expect(singleBalance(22290, 'ClosingBooked')).to.equal('');
    expect(singleBalance(22290, 'Expected')).to.equal('');
    expect(singleBalance(22290, 'Information')).to.equal('');
    expect(singleBalance(22290, 'InterimBooked')).to.equal('');
    expect(singleBalance(22290, 'OpeningBooked')).to.equal('');
    expect(singleBalance(22290, 'PreviouslyClosedBooked')).to.equal('');
    expect(singleBalance(22290, '')).to.equal('');
  });
});

describe('BalanceAvailable.vue with one available balance', () => {
  it('renders amount', () => {
    expect(singleBalance(22290, 'ClosingAvailable')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'InterimAvailable')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'OpeningAvailable')).to.equal('£22,290.00');
  });
});

describe('BalanceAvailable.vue with two available balances that have different datetimes', () => {
  const earlierDatetime = '2017-04-05T08:43:07+00:00';
  const laterDatetime = '2017-04-05T18:43:07+00:00';

  it('renders most recent datetime balance', () => {
    expect(doubleBalance(
      22290, 'ClosingAvailable', earlierDatetime,
      15000, 'OpeningAvailable', laterDatetime,
    )).to.equal('£15,000.00');

    expect(doubleBalance(
      22290, 'ClosingAvailable', laterDatetime,
      15000, 'OpeningAvailable', earlierDatetime,
    )).to.equal('£22,290.00');
  });
});

describe('BalanceAvailable.vue with two available balances that have same datetime', () => {
  const datetime = '2017-04-05T00:00:00+00:00';

  it('renders ClosingAvailable if present', () => {
    expect(doubleBalance(
      22290, 'ClosingAvailable', datetime,
      15000, 'OpeningAvailable', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'OpeningAvailable', datetime,
      22290, 'ClosingAvailable', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders InterimAvailable if present and ClosingAvailable not present', () => {
    expect(doubleBalance(
      22290, 'InterimAvailable', datetime,
      15000, 'OpeningAvailable', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'OpeningAvailable', datetime,
      22290, 'InterimAvailable', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders OpeningAvailable if present and ClosingAvailable/InterimAvailable not present', () => {
    expect(doubleBalance(
      22290, 'OpeningAvailable', datetime,
      15000, 'ForwardAvailable', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'ForwardAvailable', datetime,
      22290, 'OpeningAvailable', datetime,
    )).to.equal('£22,290.00');
  });

  it('renders ForwardAvailable if present and other available types not present', () => {
    expect(doubleBalance(
      22290, 'ForwardAvailable', datetime,
      15000, 'ForwardAvailable', datetime,
    )).to.equal('£22,290.00');

    expect(doubleBalance(
      15000, 'ForwardAvailable', datetime,
      22290, 'ForwardAvailable', datetime,
    )).to.equal('£15,000.00');
  });
});
