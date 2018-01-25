const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When, Before }) => { // eslint-disable-line
  const devServer = 'http://localhost:8080';

  // clear storage to remove any stored session_ids
  Before(() => client.execute(`
        localStorage.clear();
        sessionStorage.clear();
      `).deleteCookies().refresh());

  Given('I am logged in', () => client
    .url(devServer)
    .waitForElementVisible('#login', 5000)
    .click('button[name=login]')
    .waitForElementVisible('#activity-selection', 5000));

  Given(/^I open the homepage$/, () => client
    .url(devServer)
    .waitForElementVisible('#app', 5000));

  Then(/^I see the Login page$/, () => client
    .waitForElementVisible('#login', 5000)
    .assert.elementPresent('button[name=login]'));

  When('I login', () => client
    .waitForElementVisible('button[name=login]', 5000)
    .click('button[name=login]')
    .waitForElementVisible('#activity-selection', 5000));

  When('I login with invalid credentials', () => client
    .waitForElementVisible('input[name=u]', 5000)
    .clearValue('input[name=u]')
    .setValue('input[name=u]', 'invalid-user')
    .click('button[name=login]'));

  When('I login and the server returns 500 error', () => client
    .waitForElementVisible('input[name=u]', 5000)
    .clearValue('input[name=u]')
    .setValue('input[name=u]', 'trigger-error')
    .click('button[name=login]'));

  Then('I see a login failure message', () => client
    .waitForElementVisible('.error', 5000)
    .assert.containsText(
      'div.header',
      'Invalid username or password',
    ));

  Then('I see a login server error message', () => client
    .waitForElementVisible('.error', 5000)
    .assert.containsText(
      'div.header',
      'We are having issues with our login system',
    ));

  When('I logout', () => client
    .click('button[name=logout]'));

  Then('I see the Redirection page', () => client
    .waitForElementVisible('#redirect', 300));

  When('I wait some time', () => {});

  When('System removes the selected ASPSP from LocalStore', () => client
    .execute(() => {
      window.localStorage.removeItem('selectedAspsp');
    }));
});
