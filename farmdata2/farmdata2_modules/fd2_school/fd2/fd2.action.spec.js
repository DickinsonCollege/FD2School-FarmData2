describe("Test the Harvest Report generation", () => {
  beforeEach(() => {
      cy.login("manager1", "farmdata2")
      cy.visit("/farm/fd2-school/e2e")
  })

  it("Generate the report by clicking the button", () => {
      cy.get("[data-cy=report-header]").should("not.exist")

      cy.get("[data-cy=crop-dropdown]")
          .select("ARUGULA")
      cy.get("[data-cy=generate-report-button]")
          .click()
  })
})