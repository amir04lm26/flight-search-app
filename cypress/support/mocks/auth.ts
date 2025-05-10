interface IdbUser {
  name: string;
  email: string;
  password: string;
}

export function mockAuth(dbUsers: IdbUser[]) {
  let session = {};

  cy.intercept("GET", "/api/auth/csrf", {
    statusCode: 200,
    body: { csrfToken: "mockedCsrfToken" },
  }).as("csrf");

  cy.intercept("GET", "/api/auth/providers", {
    statusCode: 200,
    body: {
      credentials: {
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        signinUrl: "/api/auth/signin/credentials",
        callbackUrl: "/api/auth/callback/credentials",
      },
    },
  }).as("providers");

  cy.intercept("POST", "/api/auth/callback/credentials", (req) => {
    const params = new URLSearchParams(req.body);
    const email = params.get("email");
    const password = params.get("password");

    const user = dbUsers.find((user) => user.email === email);
    if (user && user.password === password) {
      session = { user };
      req.reply({ url: "http://localhost:3000/" });
    } else {
      req.reply({
        url: "http://localhost:3000/api/auth/error?error=CredentialsSignin&provider=credentials",
      });
    }
  }).as("login");

  cy.intercept("POST", "/api/auth/signup", (req) => {
    const { name, email, password } = req.body;

    if (
      name &&
      email &&
      password &&
      !dbUsers.find((user) => user.email === email)
    ) {
      dbUsers.push({ name, email, password });
      req.reply({
        statusCode: 200,
        body: { message: "Signup successful" },
      });
    } else {
      req.reply({
        statusCode: 400,
        body: { error: true, message: "Bad Request" },
      });
    }
  }).as("signup");

  cy.intercept("GET", "/api/auth/session", (req) => {
    req.reply(JSON.stringify(session));
  }).as("session");

  cy.intercept("POST", "/api/auth/signout", (req) => {
    session = {};
    req.reply({ url: "http://localhost:3000/" });
  }).as("signout");
}
