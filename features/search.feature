Feature: Flight Search
  Scenario: Search for a valid flight
    Given I am on the Mars Air homepage
    When I search for a flight with departing "July" and returning "July (next year)" and a "AB9-CDE943"
    Then I should see the message "Sorry, there are no more seats available."