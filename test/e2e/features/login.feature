Feature: Login

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
