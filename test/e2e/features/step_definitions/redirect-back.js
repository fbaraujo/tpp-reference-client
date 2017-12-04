const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

const devServer = 'http://localhost:8080';

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  When('I get redirected back without code and state parameters', () => client
    .url(`${devServer}/tpp/authorized?state=1234`)
    .waitForElementVisible('#redirect-back', 5000));

  When('I get redirected back with wrongly formatted state parameter', () => client
    .url(`${devServer}/tpp/authorized?state=1234&code=1234`)
    .waitForElementVisible('#redirect-back', 5000));

  Then(/^I see (.*) message on redirection page$/, (message) => {
    client.waitForElementVisible('#redirect-back', 5000).assert.containsText('p.message', message);
  });

  Then('I see ASPSP Selection page', () => client
    .waitForElementVisible('#aspsp-selection', 5000)
    .assert.containsText(
      'h1.header',
      'Select preferred ASPSP account',
    ));
});
