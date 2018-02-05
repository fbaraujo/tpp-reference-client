Feature: Before test run ensure consent not granted

Scenario: Revoke accounts consent if present

  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  And I wait some time
  Then revoke consent if present
