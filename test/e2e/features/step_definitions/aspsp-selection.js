const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  Then('I see the ASPSP selection page', () => client
    .waitForElementVisible('#aspsp-selection', 5000));

  When('I select an ASPSP', () => { // eslint-disable-line
    return client
      .waitForElementVisible('.aspsp-select', 5000)
      .click('button.select-aspsp');
  });
});
