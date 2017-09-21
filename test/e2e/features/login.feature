Feature: Login

Scenario: Logging in

  Given I am not logged in
  When I open homepage
  Then I see Login page
  When I login
  Then I see Accounts page
  And I see Account balance

Scenario: Redirected to login when not logged in

  Given I am not logged in
  When I visit accounts path
  Then I see Login page
