describe("Authentication", () => {
  beforeEach(() => {
    cy.mockAuthSetup();
  });

  it("should log in successfully", () => {
    cy.login("user@example.com", "password123");
    cy.get('[data-testid="profile-menu"]').should("be.visible");
  });

  // NOTE: 401 error in console is because of this test
  it("should no log in with invalid credentials", () => {
    cy.login("user@example.com", "password1234");
    cy.get("body").find('[data-testid="profile-menu"]').should("not.exist");
    cy.get("div.text-red-500")
      .contains("Invalid email or password.")
      .should("be.visible");
  });

  it("should sign up successfully", () => {
    cy.signup("New User", "newuser@example.com", "password123", "password123");
    cy.get("h2").contains("Login to Your Account").should("be.visible");

    cy.login("user@example.com", "password123");
    cy.get('[data-testid="profile-menu"]').should("be.visible");
  });

  it("should open/close profile menu", () => {
    cy.login("user@example.com", "password123");
    cy.get('[data-testid="profile-menu"]').should("be.visible");

    cy.toggleProfileMenu();
    cy.get(".absolute").should("be.visible");

    cy.toggleProfileMenu();
    cy.get("body").find(".absolute .text-xs").should("not.exist");
  });

  it("should log out successfully", () => {
    cy.login("user@example.com", "password123");
    cy.get('[data-testid="profile-menu"]').should("be.visible");

    cy.logout();
    cy.get('[data-testid="profile-menu"]').should("not.exist");
  });
});
