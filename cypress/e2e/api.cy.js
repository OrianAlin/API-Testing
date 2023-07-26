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
  it("API Tests - Status Code", () => {
    cy.request("/users/2").as("existingUser");
    cy.get("@existingUser").its("status").should("equal", 200);

    cy.request({ url: "/users/non-exist", failOnStatusCode: false }).as(
      "nonExistingUser"
    );
    cy.get("@nonExistingUser").its("status").should("equal", 404);
  });
  it.only("API Tests - GET request", () => {
    cy.request({ url: "/users/2", method: "GET" }).as("user");
    cy.get("@user").then((res) => {
      cy.log(JSON.stringify(res.body));
      expect(res.body.data.id).equal(2);
      expect(res.body.data.email).contain("janet.weaver@reqres.in");
      expect(res.body.data.last_name).not.to.contain("SomeFunnyName");

      const userID = res.body.data.id;
      expect(userID).to.equal(2);
    });
  });
});
