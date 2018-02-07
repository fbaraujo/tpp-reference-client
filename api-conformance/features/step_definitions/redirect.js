const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');


defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line
  const devServer = 'http://localhost:8080';
  const redirectPath = `${devServer}/redirect`;

  When('I visit the redirect page', () => client.url(redirectPath));

  Then(/^I see \"(.*)\" message on the redirection page$/, message => client.waitForElementVisible('#redirect', 5000)
    .assert.containsText('#redirect p', message));

  Then('I see the Redirection message to ASPSP', () => client
    .waitForElementVisible('#redirect', 3000)
    .assert.containsText('#redirect p', 'You are now leaving (TPP) and we are securely transfering you over to',
    ));
});
