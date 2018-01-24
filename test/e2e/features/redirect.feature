Feature: Redirection page

Scenario: Redirected to login when accessing redirect page without session

  Given I visit the redirect page
  Then I see the Login page

Scenario: Redirected to select ASPSP page when accessing redirect page without correct scope

  Given I am logged in
  When I visit the redirect page
  Then I see "Unfortunately you have not selected an activity" message on the redirection page
  And I see the Activity selection page
