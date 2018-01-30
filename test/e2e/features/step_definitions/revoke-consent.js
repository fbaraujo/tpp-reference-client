const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  When('I revoke consent', () => {
    client
      .waitForElementVisible('button[name=revoke-consent]', 5000)
      .click('button[name=revoke-consent]');
  });

  When('I select View Balances', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.view-balances', 5000)
      .click('button.view-balances');
  });

  When('I select Make Payment', () => client
    .waitForElementVisible('.make-payment', 5000)
    .click('button.make-payment'));
});
