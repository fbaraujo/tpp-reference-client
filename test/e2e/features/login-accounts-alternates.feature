Feature: Login to see accounts alternate scenarios

Scenario: Visit accounts path redirects to ASPSP selection page when ASPSP not selected

  Given I am logged in
  And I select View Balances
  When I visit the accounts path
  Then I see the ASPSP selection page

Scenario: Redirect to ASPSP selection page when ASPSP not selected on the redirection page

  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  When System removes the selected ASPSP from LocalStore
  And I reload the page
  Then I see the Activity selection page

Scenario: Trying to view account balance without giving consent

  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  And I do not give consent
  When I wait some time
  Then I see an authorisation consent not provided message on the redirection back page
  And I see the Activity selection page
