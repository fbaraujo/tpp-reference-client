const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  When('I confirm payment', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.confirm-payment', 5000)
      .click('button.confirm-payment');
  });

  Then('I see the payment completed screen', () => client
    .waitForElementVisible('#payment-completed', 5000)
    .assert.containsText(
      'h1',
      'Payment Completed',
    ));
});
