const { client } = require('nightwatch-cucumber');
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, Then, When }) => { // eslint-disable-line

  When('revoke consent if present', () => {
    const revokeButton = 'button[name=revoke-consent]';
    client.element('css selector', revokeButton, (result) => {
      const revokeConsentButtonPresent = result.status !== -1;

      if (revokeConsentButtonPresent) {
        client
          .click(revokeButton)
          .waitForElementVisible('#consent-revoked', 5000)
          .click('button[name=logout]');
      }
    });
  });

  When('I revoke consent', () => {
    client
      .waitForElementVisible('button[name=revoke-consent]', 5000)
      .click('button[name=revoke-consent]');
  });
});
