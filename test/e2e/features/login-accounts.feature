Feature: Login to see accounts

Scenario: Logging in and viewing account balance

  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  And I give consent
  Then I see the Accounts page
  And I see an Account balance
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page
  Given I login
  And I select View Balances
  When I select an ASPSP
  Then I see the Accounts page
  And I see an Account balance
  Given I revoke consent
  Then I logout
  And I login
  And I select View Balances
  When I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  And I give consent
  Then I see the Accounts page
  And I see an Account balance
  And I revoke consent
