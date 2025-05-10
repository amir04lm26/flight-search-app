/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    signup(
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ): Chainable<void>;
    toggleProfileMenu(): Chainable<void>;
    logout(): Chainable<void>;
    mockAuthSetup(): Chainable<void>;
  }
}
