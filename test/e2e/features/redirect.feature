Feature: Redirection page

Scenario: Redirected to login when accessing redirect page without session

  Given I am not logged in
  When I visit the redirect page
  Then I see the Login page

Scenario: Redirected to select aspsp page when accessing redirect page without correct scope

  Given I am not logged in
  When I open the homepage
  Then I see the Login page
  When I login
  When I visit the redirect page
  Then I see "Unfortunately you have not selected an activity" message on the redirection page
  And I see the Activity selection page


