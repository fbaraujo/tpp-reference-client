Feature: User is redirected back from ASPSP after providing consent

Scenario: Logged in user is redirected back to tpp client with missing query parameters

  Given I am logged in
  And I select View Balances
  Then I see ASPSP selection page
  When I get redirected back without code and state parameters
  Then I see Invalid request message on redirection page
  When I wait some time
  Then I see ASPSP Selection page

Scenario: Logged in user is redirected back to tpp client with wrongly formatted state query parameters

  Given I am logged in
  And I select View Balances
  Then I see ASPSP selection page
  When I get redirected back with wrongly formatted state parameter
  Then I see Invalid state format message on redirection page
  When I wait some time
  Then I see ASPSP Selection page

  Scenario: Logged in user is redirected back to tpp client with wrong session id

  Given I am logged in
  And I select View Balances
  Then I see ASPSP selection page
  When I get redirected back with wrong session id
  Then I see Invalid session message on redirection page
  When I wait some time
  Then I see ASPSP Selection page
