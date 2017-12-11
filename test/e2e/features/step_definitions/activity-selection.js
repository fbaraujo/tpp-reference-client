const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  Then('I see the Activity selection page', () => client
  .waitForElementVisible('#activity-selection', 5000)
  .assert.containsText(
    'h1',
    'Select activity',
  ));

  When('I select View Balances', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.view-balances', 5000)
      .click('button.view-balances');
  });

  When('I select Make Payment', () => client
    .waitForElementVisible('.make-payment', 5000)
    .click('button.make-payment'));
});
