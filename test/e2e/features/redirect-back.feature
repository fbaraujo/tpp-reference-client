Feature: User is redirected back from ASPSP after providing consent

Scenario: Logged in user is redirected back to tpp client with missing query parameters

  Given I am logged in
  And I select View Balances
  Then I see the ASPSP selection page
  When I get redirected back without code and state parameters
  Then I see an Invalid request message on the redirection back page
  When I wait some time
  Then I see the Activity selection page

Scenario: Logged in user is redirected back to tpp client with wrongly formatted state query parameters

  Given I am logged in
  And I select View Balances
  Then I see the ASPSP selection page
  When I get redirected back with wrongly formatted state parameter
  Then I see an Invalid state format message on the redirection back page
  When I wait some time
  Then I see the Activity selection page
