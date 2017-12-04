const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => {
  const devServer = 'http://localhost:8080';
  const accountsPath = `${devServer}/accounts`;

  Given('I visit the accounts path', () => client
    .url(accountsPath));

  Then('I see the Accounts page', () => client
    .waitForElementVisible('#accounts', 5000)
    .assert.containsText(
      'h1',
      'Accounts',
    ));

  Then('I see an Account balance', () => client
    .waitForElementVisible('.account', 5000)
    .waitForElementVisible('.balance-booked', 5000)
    .assert.containsText(
      '.balance-booked',
      '£5,800.00',
    ));
});
