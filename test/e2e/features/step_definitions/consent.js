const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  Then('I give consent', () => client
    .waitForElementVisible('#bank-consent', 5000)
    .click('#approve'));

  Then('I do not give consent', () => client
    .waitForElementVisible('#bank-consent', 5000)
    .click('#cancel'));
});
