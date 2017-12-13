Feature: Select ASPSP from list in order to add accounts

Scenario: Select from list of ASPSPs in order to add accounts

  Given I am logged in
  And I select View Balances
  Then I see the ASPSP selection page
  When I select an ASPSP
  And I give consent
  Then I see the Accounts page
