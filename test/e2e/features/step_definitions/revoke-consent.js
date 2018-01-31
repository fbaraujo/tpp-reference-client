const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  When('I revoke consent', () => {
    client
      .waitForElementVisible('button[name=revoke-consent]', 5000)
      .click('button[name=revoke-consent]');
  });
});
