Feature: Before test run ensure consent not granted

Scenario: Revoke accounts consent if present

  Given I am logged in
  And I select View Balances
  When I select an ASPSP
  Then revoke consent if present
