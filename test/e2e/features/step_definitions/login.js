const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  const devServer = 'http://localhost:8080';
  const accountsPath = `${devServer}/accounts`;

  Given('I am not logged in', () => {
    // nothing to do
  });

  Given('I visit accounts path', () => client
    .url(accountsPath));

  Given(/^I open homepage$/, () => { // eslint-disable-line
    return client
      .url(devServer)
      .waitForElementVisible('#app', 5000);
  });

  Then(/^I see Login page$/, () => client
    .waitForElementVisible('#login', 5000)
    .assert.containsText(
      'h1',
      'Login to view balances',
    ).assert.elementPresent('button'));
});
