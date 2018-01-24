Feature: Login to see accounts

Background:
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  Then I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP

Scenario: Logging in and viewing account balance

  When I wait some time
  And I give consent
  Then I see the Accounts page
  And I see an Account balance
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and redirect to ASPSP selection page if ASPSP not selected on accounts page

  When I wait some time
  And I give consent
  Then I see the Accounts page
  And I see an Account balance
  When System removes the selected ASPSP from LocalStore
  And I reload the page
  Then I see the ASPSP selection page
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and redirect to ASPSP selection page if ASPSP not selected on the redirection page

  When System removes the selected ASPSP from LocalStore
  And I reload the page
  Then I see the Activity selection page
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and try viewing account balance without giving consent

  And I do not give consent
  When I wait some time
  Then I see an authorisation consent not provided message on the redirection back page
  And I see the Activity selection page
  When I logout
  Then I see the Login page
