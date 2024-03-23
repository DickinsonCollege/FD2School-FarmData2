describe("Test that generate report works", () => {
  beforeEach(() => {
    cy.login("manager1", "farmdata2")
    cy.visit("/farm/fd2-school/e2e")
  })
  it("Check generate report", () => {
    cy.get("[data-cy=report-header]")
      .should("not.exist")
    cy.get("[data-cy=generate-report-button]").click()
    cy.get("[data-cy=report-header]")
      .should("be.visible")
  })
})