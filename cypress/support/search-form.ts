/// <reference types="cypress" />

Cypress.Commands.add("clickIncrement", (labelText: string, times = 1) => {
  cy.contains(labelText).parent().find("button").eq(1).as("incrementBtn");

  for (let i = 0; i < times; i++) {
    cy.get("@incrementBtn").click();
  }
});

Cypress.Commands.add("clickDecrement", (labelText: string, times = 1) => {
  cy.contains(labelText).parent().find("button").eq(0).as("decrementBtn");

  for (let i = 0; i < times; i++) {
    cy.get("@decrementBtn").click();
  }
});
