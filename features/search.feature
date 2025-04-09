Feature: Flight Search
  Scenario Outline: Search for a valid flight
    Given I am on the Mars Air homepage
    When I search for a flight with departing "<departure>" and returning "<return>" and a "<promoCode>"
    Then I should see the message "<result>"

    Examples:
      | departure | return                        | promoCode  | result                                     |
      | July      | December (two years from now) | AB9-CDE943 | Seats available                            |
      | July      | July (next year)              | AB9-CDE943 | Sorry, there are no more seats available.  |