const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  Then('I see the Activity selection page', () => client
    .waitForElementVisible('#activity-selection', 5000));

  When('I select View Balances', () => { // eslint-disable-line
    return client
      .waitForElementVisible('button[name=view-balances]', 5000)
      .click('button[name=view-balances]');
  });

  When('I select Make Payment', () => client
    .waitForElementVisible('button[name=make-payment]', 5000)
    .click('button[name=make-payment]'));
});
