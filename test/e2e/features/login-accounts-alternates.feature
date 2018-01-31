Feature: Login to see accounts alternate scenarios

Background:
  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  When I wait some time

Scenario: Logging in and redirect to ASPSP selection page if ASPSP not selected on accounts page

  And I give consent
  Then I see the Accounts page
  And I revoke consent
  When System removes the selected ASPSP from LocalStore
  And I reload the page
  Then I see the ASPSP selection page

Scenario: Logging in and redirect to ASPSP selection page if ASPSP not selected on the redirection page

  When System removes the selected ASPSP from LocalStore
  And I reload the page
  Then I see the Activity selection page

Scenario: Logging in and try viewing account balance without giving consent

  And I do not give consent
  When I wait some time
  Then I see an authorisation consent not provided message on the redirection back page
  And I see the Activity selection page
