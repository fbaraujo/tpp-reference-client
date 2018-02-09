const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  const devServer = 'http://localhost:8080';
  const paymentCompletedPath = `${devServer}/payment-submitted`;

  When(/^I fill the form with the following data$/, (table) => {
    table.rawTable.shift();
    return table.rawTable.map((entry) => {
      const target = `input[name=${entry[0]}]`;
      const value = entry[1];

      return client.waitForElementVisible(target, 5000)
      .clearValue(target)
      .setValue(target, value);
    });
  });

  Given('I visit the payment submitted path', () => client
    .url(paymentCompletedPath));

  When('I confirm payment', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.confirm-payment', 5000)
      .click('button.confirm-payment');
  });

  Then('I see payment submitted on screen', () => client
    .waitForElementVisible('#payment-submitted .submitted', 5000)
    .assert.containsText(
      'h1',
      'Payment submitted',
    ));
});
