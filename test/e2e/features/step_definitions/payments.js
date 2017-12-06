const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  const devServer = 'http://localhost:8080';
  const paymentCompletedPath = `${devServer}/payment-submitted`;

  Given('I visit the payment completed path', () => client
    .url(paymentCompletedPath));

  When('I confirm payment', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.confirm-payment', 5000)
      .click('button.confirm-payment');
  });

  Then('I see payment completed on screen', () => client
    .waitForElementVisible('#payment-completed .completed', 5000)
    .assert.containsText(
      'h1',
      'Payment completed',
    ));
});
