Feature: Flight Search
  Scenario: Search for a valid flight
    Given I am on the Mars Air homepage
    When I search for a flight with departing "July" and returning "December" and a "AF3-FJK-418"
    Then I should see the flight search result