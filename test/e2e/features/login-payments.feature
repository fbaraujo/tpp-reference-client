Feature: Making a payment

Scenario: Login to make a payment

Given I am not logged in
When I open the homepage
Then I see the Login page
When I login
Then I select Make Payment
And I confirm payment
And I select an ASPSP
Then I see the Redirection page
When I wait some time
Then I see the payment completed screen
When I logout
Then I see the Login page
When I visit the payment completed path
Then I see the Login page