const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  When('I select View Balances', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.view-balances', 5000)
      .click('button.view-balances');
  });
});
