describe("Flight Search Form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("fills and submits the search form", () => {
    cy.get('input[placeholder="Origin (IATA Code)"]').type("Tehran");

    cy.get('input[placeholder="Destination (IATA Code)"]').type("Kish");

    cy.get('input[placeholder="Departure Date"]').click();
    cy.get(".react-calendar__tile--now").click();

    cy.get('input[placeholder="Return Date"]').click();
    cy.get(".react-calendar__tile--now").next().next().click();

    cy.get('[placeholder="Children, Adults, Rooms"]').click();
    cy.clickIncrement("Adults", 2); // 3 adults
    cy.clickIncrement("Children", 1); // 1 child
    cy.clickIncrement("Rooms", 1); // 2 rooms

    cy.get("button").contains("Apply").click();
    cy.get("button")
      .contains("Search Flights")
      .should("be.visible")
      .click({ force: true });

    cy.url().should("include", "origin=Tehran");
    cy.url().should("include", "destination=Kish");
    cy.url().should("include", "departureDate=");
    cy.url().should("include", "returnDate=");
    cy.url().should("include", "adult=3");
    cy.url().should("include", "child=1");
    cy.url().should("include", "rooms=2");
  });

  it("shows validation errors when submitting empty form", () => {
    cy.contains("button", "Search Flights").click();

    cy.contains("Origin is required").should("exist");
    cy.contains("Destination is required").should("exist");
  });
});
