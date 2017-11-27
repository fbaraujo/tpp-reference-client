import Vue from 'vue';
import BalanceAvailable from '@/components/BalanceAvailable';
import balanceData from './BalanceData';

const balanceText = (balance) => {
  const Constructor = Vue.extend(BalanceAvailable);
  const vm = new Constructor({ propsData: { availableBalance: balance } }).$mount();
  if (vm.$el.childElementCount) {
    return vm.$el.querySelector('.amount').textContent;
  }
  return '';
};

const singleBalance = (amount, type, direction = 'Credit') => balanceText(
  balanceData(amount, type, direction),
);


describe('BalanceAvailable.vue with no available balance', () => {
  it('renders blank', () => expect(balanceText([])).to.equal(''));
});

describe('BalanceAvailable.vue with single balance that is not a available balance', () => {
  xit('renders blank', () => {
    expect(singleBalance(22290, 'ClosingBooked')).to.equal('');
    expect(singleBalance(22290, 'Expected')).to.equal('');
    expect(singleBalance(22290, 'Information')).to.equal('');
    expect(singleBalance(22290, 'InterimBooked')).to.equal('');
    expect(singleBalance(22290, 'OpeningBooked')).to.equal('');
    expect(singleBalance(22290, 'PreviouslyClosedBooked')).to.equal('');
    expect(singleBalance(22290, '')).to.equal('');
  });
});

describe('BalanceAvailable.vue with one available credit balance', () => {
  it('renders amount', () => {
    expect(singleBalance(22290, 'ClosingAvailable')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'InterimAvailable')).to.equal('£22,290.00');
    expect(singleBalance(22290, 'OpeningAvailable')).to.equal('£22,290.00');
  });
});

describe('BalanceAvailable.vue with one available debit balance', () => {
  it('renders amount', () => {
    expect(singleBalance(22290, 'ClosingAvailable', 'Debit')).to.equal('-£22,290.00');
    expect(singleBalance(22290, 'InterimAvailable', 'Debit')).to.equal('-£22,290.00');
    expect(singleBalance(22290, 'OpeningAvailable', 'Debit')).to.equal('-£22,290.00');
  });
});

