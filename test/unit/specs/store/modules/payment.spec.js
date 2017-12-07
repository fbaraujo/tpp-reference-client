import store from '@/store';

const paymentData = { ex: 'ample' };

describe('dispatch makePayment', () => {
  it('stores confirmed payment', () => {
    store.dispatch('makePayment', paymentData);
    expect(store.getters.confirmedPayment()).to.deep.equal(paymentData);
  });
});

describe('commit CLEAR_CONFIRMED_PAYMENT', () => {
  it('clears stored payment', () => {
    store.dispatch('makePayment', paymentData);
    store.commit('CLEAR_CONFIRMED_PAYMENT');
    expect(store.getters.confirmedPayment()).to.deep.equal({});
  });
});
