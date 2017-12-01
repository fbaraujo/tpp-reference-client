Feature: Login to see accounts

Scenario: Logging in and out

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  And I select an ASPSP
  Then I see the Redirection page
  When I wait some time
  Then I see the Accounts page
  And I see an Account balance
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page

Scenario: Redirected to login when not logged in

  Given I am not logged in
  When I visit the accounts path
  Then I see the Login page

Scenario: Logging in and server returns 500 error

  Given I am not logged in
  And I open the homepage
  When I login and the server returns 500 error
  Then I see the Login page
  And I see a login server error message

Scenario: Logging in with invalid credentials

  Given I am not logged in
  And I open the homepage
  When I login with invalid credentials
  Then I see the Login page
  And I see a login failure message

Scenario: Logging in and redirect to aspsp selection page if aspsp not selected on accounts page

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  And I select View Balances
  Then I select an ASPSP
  Then I see the Redirection page
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
  When System removes the selected aspsp from LocalStore
  And I reload the page
  Then I see the ASPSP selection page
  When I logout
  Then I see the Login page
  When I visit the accounts path
  Then I see the Login page
