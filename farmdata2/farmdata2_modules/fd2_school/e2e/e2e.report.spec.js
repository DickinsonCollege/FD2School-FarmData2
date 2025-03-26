describe("Test the report generation", () => {
    beforeEach(() => {
        cy.login("manager1", "farmdata2")
        cy.visit("/farm/fd2-school/e2e")
    })

    it("Check the report title exists", () => {
      cy.get("[data-cy=report-title]").should("exist")
    })


    it("Click the generate report button", () => {
      cy.get("[data-cy=generate-report-button]").click()
    })

    it("Check the report title is visible", () => {
      cy.get("[data-cy=report-title]").should("be.visible")
    })



})
