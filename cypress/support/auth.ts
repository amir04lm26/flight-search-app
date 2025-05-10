/// <reference types="cypress" />

import { mockAuth } from "./mocks/auth";

Cypress.Commands.add("mockAuthSetup", () => {
  cy.fixture("db-users.json").then((users) => {
    cy.clearCookies();
    cy.clearLocalStorage();
    mockAuth(users);
  });
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/");
  cy.get('[data-testid="auth-skeleton"]', { timeout: 10000 }).should(
    "not.exist"
  );

  cy.get("button").contains("Login / Signup").click();
  cy.get('input[name="email"]').should("exist").type(email);
  cy.get('input[name="password"]').should("exist").type(password);
  cy.get('button[type="submit"]').contains("Login").click();
});

Cypress.Commands.add("signup", (name, email, password, confirmPassword) => {
  cy.visit("/");
  cy.get('[data-testid="auth-skeleton"]', { timeout: 10000 }).should(
    "not.exist"
  );

  cy.get("button").contains("Login / Signup").click();
  cy.get("button").contains("Sign up").click();
  cy.get('input[name="name"]').should("exist").type(name);
  cy.get('input[name="email"]').should("exist").type(email);
  cy.get('input[name="password"]').should("exist").type(password);
  cy.get('input[name="confirmPassword"]').should("exist").type(confirmPassword);
  cy.get('button[type="submit"]').contains("Sign Up").click();
});

Cypress.Commands.add("toggleProfileMenu", () => {
  cy.get('[data-testid="profile-menu"]').click();
});

Cypress.Commands.add("logout", () => {
  cy.get('[data-testid="profile-menu"]').click();
  cy.get("button").contains("Sign out").click();
});
