Feature: Making a payment

Scenario: Login to make a payment

  Given I am logged in
  Then I select Make Payment
  And I confirm payment
  And I select an ASPSP
  Then I see the Redirection page
  And I see the Redirection message to ASPSP
  When I wait some time
  And I give consent
  Then I logout
