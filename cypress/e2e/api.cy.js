/// <reference types="cypress" />

describe("Learn REST API Testing with Cypress", () => {
  it("passes", () => {
    cy.request("/users/2").then((Response) => {
      cy.log(JSON.stringify(Response.body.data.email));
      cy.log(JSON.stringify(Response.headers));
    });
  });
  it("API Tests - Validate Headers", () => {
    cy.request("/users/2").as("user");
    cy.get("@user")
      .its("headers")
      .its("content-type")
      .should("include", "application/json");
    cy.get("@user")
      .its("headers")
      .its("connection")
      .should("include", "keep-alive");
  });
  it("API Tests - Status Code", () => {});
});
