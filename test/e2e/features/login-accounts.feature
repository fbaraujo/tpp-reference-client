Feature: Login to see accounts

Scenario: Logging in and viewing account balance

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  And I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  Then I see the Accounts page
  And I see an Account balance
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and redirect to aspsp selection page if aspsp not selected on accounts page

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  Then I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  Then I see the Accounts page
  And I see an Account balance
  When System removes the selected aspsp from LocalStore
  And I reload the page
  Then I see the ASPSP selection page
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and redirect to aspsp selection page if aspsp not selected on the redirection page

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  Then I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When System removes the selected aspsp from LocalStore
  And I reload the page
  Then I see the Activity selection page
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page
