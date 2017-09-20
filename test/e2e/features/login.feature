Feature: Login

Scenario: Logging in

  Given I open homepage
  Then the title is "Login to view balances"
  And the Login button exists

Scenario: Redirected to login when not logged in

  Given I am not logged in
  And I visit accounts path
  Then the title is "Login to view balances"
  And the Login button exists
