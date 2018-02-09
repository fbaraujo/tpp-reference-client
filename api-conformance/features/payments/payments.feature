Feature: Making a payment

Scenario: Login to make a payment

  Given I am logged in
  Then I select Make Payment
  When I fill the form with the following data
  | field            | value             |
  | name             | Dude Dude         |
  | sort-code        | 111111            |
  | account-number   | 87654321          |
  | amount           | 100.00            |
  And I confirm payment
  And I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  And I give consent
  Then I logout
